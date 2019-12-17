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
  const payments = await jasmin.sales.getSalesReceivable();

  res.status(200).json({
    payments: payments.reduce(
      (a, b) => a.concat({ sourceDoc: b.receiptLines[0].sourceDoc }),
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
          item: {
            itemId: b.documentLines[0].purchasesItem,
            description: b.documentLines[0].purchasesItemDescription,
            value: b.documentLines[0].unitPrice.amount,
            quantity: b.documentLines[0].quantity,
          },
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
            value: b.documentLines[0].unitPrice.amount,
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
