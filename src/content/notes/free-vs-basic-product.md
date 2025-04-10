The features of a free product vs. growth product are the same, which makes free products excellent for prototyping. However there are important billing differences:

| Free Product | Growth Product |
| :---: | :---: |
| Free | Cost varies by number of blocks required |
| When you hit the limit, pauses until end of billing cycle | Automatically adds a block if necessary |
| Owned by a single user account | Owned by an organization |
| Product-level access control | Product and organization level access control |

#### Free products

The limits of the free plan are:

- Up to {{freeTierDevices}} devices, any mix of cellular and Wi-Fi
- {{freeTierDataOperationsUnit}} Data Operations ({{freeTierDataOperationsComma}}) per month, for both cellular and Wi-Fi, pooled across all devices
- Up to {{freeTierDataOperationsCellularData}} of cellular data per month, pooled across all devices, at no charge

Note that the device limit and data operations limit apply to both:

- Developer devices claimed to a user
- All devices in all products that are owned by that user, regardless of claiming

Thus even if you are using unclaimed product devices, with a free product owned by a user, the limit of 100 devices still applies.

Another important difference is that when you hit the data operation or cellular data limit in a free account, all data operations will be paused until the next billing cycle. This applies to both developer devices claimed to the user, as well as all product devices for products owned by that user.

#### Basic products

Basic products have no limits, however as you use larger number of devices, data operations, or cellular data, the cost will increase because of the additional blocks:

- A block includes {{basicTierDataOperationsUnit}} Data Operations ({{basicTierDataOperationsComma}}) per month and up to {{basicTierDevices}} devices
- Add as many blocks as you need for more Data Operations or more devices
- No limit to the number of blocks you can purchase self-service
- Up to {{basicTierDataOperationsCellularData}} of cellular data per month, pooled across all devices, for each block purchased
- This was formerly known as a Growth product

