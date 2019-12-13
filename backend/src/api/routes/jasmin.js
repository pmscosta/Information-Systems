'use strict';

const router = require('express').Router();
const jasmin = require('../jasmin/routes');

router.get('/stock', (req, res) => {
  jasmin.stock.getMaterialItems().then(data =>
    res.status(200).json(
      data.map(
        ({
          description,
          itemKey,
          materialsItemWarehouses,
          minStock,
        }) => {
          const warehouses = materialsItemWarehouses.map(
            ({ stockBalance, lastUnitCost, inventoryBalance }) => {
              const unitAmount = lastUnitCost.amount;
              const balanceAmount = inventoryBalance.amount;
              return { stockBalance, unitAmount, balanceAmount };
            },
          );
          return { description, itemKey, warehouses, minStock };
        },
      ),
    ),
  );
});

router.get('/sales', async (req, res) => {
  const invoices = await jasmin.sales.getSalesInvoices();
  const orders = await jasmin.sales.getSalesOrders();

  res.status(200).json({
    invoiced: invoices
      .filter(({ isDeleted }) => {
        return !isDeleted;
      })
      .reduce(
        (a, b) =>
          a.concat({
            sourceDoc: b.documentLines[0].sourceDoc,
            amount: b.payableAmount.amount,
            date: b.dueDate,
          }),
        [],
      ),
    open: orders
      .filter(({ isDeleted }) => {
        return !isDeleted;
      })
      .filter(el => el.naturalKey.indexOf('EI') === -1)
      .reduce(
        (a, b) =>
          a.concat({
            naturalKey: b.naturalKey,
            amount: b.taxExclusiveAmount.amount,
          }),
        [],
      ),
  });
});

router.get('/purchases', async (req, res) => {
  const invoices = await jasmin.purchases.getPurchaseInvoices();
  const orders = await jasmin.purchases.getPurchaseOrders();
  let payments = await jasmin.purchases.getPayments();
  payments = payments.reduce(
    (a, b) => a.concat({ sourceDoc: b.documentLines[0].sourceDoc }),
    [],
  );

  const openPurchases = orders
    .filter(({ isDeleted }) => {
      return !isDeleted;
    })
    .reduce(
      (a, b) =>
        a.concat({
          naturalKey: b.naturalKey,
          amount: b.taxExclusiveAmount.amount,
        }),
      [],
    );

  const receiptPurchases = invoices
    .filter(({ isDeleted }) => isDeleted === false)
    .reduce(
      (a, b) =>
        a.concat({
          naturalKey: b.naturalKey,
          sourceDoc: b.documentLines[0].sourceDoc,
          amount: b.taxExclusiveAmount.amount,
          payableAmount: b.payableAmount.amount,
          date: b.documentDate,
          item: {
            itemId: b.documentLines[0].purchasesItem,
            description: b.documentLines[0].purchasesItemDescription,
            quantity: b.documentLines[0].quantity,
          },
          supplier: b.sellerSupplierPartyName,
        }),
      [],
    );

  return res.status(200).json({
    open: openPurchases
      .filter(el => {
        return (
          receiptPurchases.find(
            obj => obj.sourceDoc === el.naturalKey,
          ) === undefined
        );
      })
      .filter(el => el.naturalKey.indexOf('VEI') === -1),
    invoiced: receiptPurchases,
    payments,
  });
});
module.exports = router;
