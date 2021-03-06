/* eslint-disable no-param-reassign */
/**
 * Updates HTMLWebpackPlugin assets src/href attributes to Shopify Liquid, piping
 * the filename to `asset_url`.
 */
const path = require('path')

function AssetTagToShopifyLiquid() { }

AssetTagToShopifyLiquid.prototype.apply = (compiler) => {
  compiler.plugin('compilation', (compilation) => {
    // https://github.com/jantimon/html-webpack-plugin#events
    compilation.plugin('html-webpack-plugin-alter-asset-tags', (data, cb) => {
      function fixTag(tag) {
        if (tag.tagName === 'script') {
          tag.attributes.src = `{{ '${path.basename(tag.attributes.src)}' | asset_url  }}`
        }

        if (tag.tagName === 'link') {
          tag.attributes.href = `{{ '${path.basename(tag.attributes.href)}' | asset_url  }}`
        }

        return tag
      }

      data.head = data.head.map(fixTag)
      data.body = data.body.map(fixTag)

      cb(null, data)
    })
  })
}

module.exports = AssetTagToShopifyLiquid
