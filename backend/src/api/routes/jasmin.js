'use strict';

const router = require('express').Router();
const jasmin = require('../jasmin/routes');

router.get('/stock', (req, res) => {
  jasmin.stock.getMaterialItems().then(data =>
    res.status(200).json(
      data.map(
        ({ description, itemKey, materialsItemWarehouses }) => {
          const warehouses = materialsItemWarehouses.map(
            ({ stockBalance, lastUnitCost, inventoryBalance }) => {
              const unitAmount = lastUnitCost.amount;
              const balanceAmount = inventoryBalance.amount;
              return { stockBalance, unitAmount, balanceAmount };
            },
          );
          return { description, itemKey, warehouses };
        },
      ),
    ),
  );
});

router.get('/purchases', (req, res) => {
  jasmin.purchases.getPurchaseInvoices().then(receiptPurchasesRes => {
    jasmin.purchases.getPurchaseOrders().then(openPurchasesRes => {
      const openPurchases = openPurchasesRes
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

      const receiptPurchases = receiptPurchasesRes
        .filter(({ isDeleted }) => isDeleted === false)
        .reduce(
          (a, b) =>
            a.concat({
              sourceDoc: b.documentLines[0].sourceDoc,
              amount: b.payableAmount.amount,
            }),
          [],
        );

      return res.status(200).json({
        openPurchases: openPurchases
          .filter(el => {
            return (
              receiptPurchases.find(
                obj => obj.sourceDoc === el.naturalKey,
              ) === undefined
            );
          })
          .filter(el => el.naturalKey.indexOf('VEI') === -1),
        receiptPurchases,
      });
    });
  });
});

module.exports = router;
