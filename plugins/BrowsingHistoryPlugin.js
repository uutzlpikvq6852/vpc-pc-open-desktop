function getHost(metadata) {
  switch (+metadata.destinationPort) {
    case 443:
      return `https://${metadata.host || metadata.destinationIP}`
    case 80:
      return `http://${metadata.host || metadata.destinationIP}`
    default:
      return (
        (metadata.host || metadata.destinationIP) +
        (metadata.destinationPort ? ':' + metadata.destinationPort : '')
      )
  }
}

function getList(params) {
  return Object.entries(params)
    .map(([host, size]) => ({
      host,
      hostStyle: { color: size >= 100 ? '#f56c6c' : '#7aa874' },
      size,
      sizeStyle: { color: size >= 100 ? '#f56c6c' : '#7aa874' }
    }))
    .sort((a, b) => b.size - a.size)
    .splice(0, global.forms.topN)
}

module.exports = {
  name: '網址瀏覽記錄',
  version: '1.0.0',
  author: '@uutzlpikvq6852',
  description: '網址、IP、瀏覽記錄',
  homepage: 'https://github.com/uutzlpikvq6852/vpc-pc-open-desktop',
  icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjg0MTU3ODkzNjM0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjM1NDQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTAgMGgxMDI0djEwMjRIMFYweiIgZmlsbD0iIzIwMjQyNSIgb3BhY2l0eT0iLjAxIiBwLWlkPSIzNTQ1Ij48L3BhdGg+PHBhdGggZD0iTTg1My4zMzMzMzMgNTQ2LjEzMzMzM2MzNy43MTczMzMgMCA2OC44MTI4IDMwLjcyIDYzLjAxMDEzNCA2Ny45OTM2YTQ0My43Njc0NjcgNDQzLjc2NzQ2NyAwIDAgMS04NzMuNjc2OCAxOC41Njg1MzRBNDQzLjczMzMzMyA0NDMuNzMzMzMzIDAgMCAxIDQwOS44NzMwNjcgMTA3LjY1NjUzM0M0NDcuMTEyNTMzIDEwMS44NTM4NjcgNDc3Ljg2NjY2NyAxMzIuOTgzNDY3IDQ3Ny44NjY2NjcgMTcwLjY2NjY2N3YzMDcuMmE2OC4yNjY2NjcgNjguMjY2NjY3IDAgMCAwIDY4LjI2NjY2NiA2OC4yNjY2NjZoMzA3LjJ6IiBmaWxsPSIjRkY3NzQ0IiBwLWlkPSIzNTQ2Ij48L3BhdGg+PHBhdGggZD0iTTkyMS42IDQ3Ny44NjY2NjdjMzcuNzE3MzMzIDAgNjguODEyOC0zMC43MiA2My4wMTAxMzMtNjcuOTkzNkE0NDMuODAxNiA0NDMuODAxNiAwIDAgMCA2MTQuMTI2OTMzIDM5LjM4OTg2N0M1NzYuODg3NDY3IDMzLjU4NzIgNTQ2LjEzMzMzMyA2NC43MTY4IDU0Ni4xMzMzMzMgMTAyLjR2MzA3LjJhNjguMjY2NjY3IDY4LjI2NjY2NyAwIDAgMCA2OC4yNjY2NjcgNjguMjY2NjY3aDMwNy4yeiIgZmlsbD0iI0ZGQUE0NCIgcC1pZD0iMzU0NyI+PC9wYXRoPjwvc3ZnPg==',
  components: [
    {
      type: 'table',
      title: '網址瀏覽記錄',
      heads: [
        {
          name: '記錄',
          value: 'host'
        },
        {
          name: '次數',
          value: 'size'
        }
      ],
      data: () => {
        return getList(global.store?.hostRecords || {})
      }
    },
    {
      type: 'table',
      title: 'IP瀏覽記錄',
      heads: [
        {
          name: '記錄',
          value: 'host'
        },
        {
          name: '次數',
          value: 'size'
        }
      ],
      data: () => {
        return getList(global.store?.ipRecords || {})
      }
    }
  ],
  forms: [
    {
      type: 'number',
      key: 'topN',
      label: '顯示數量',
      defaultValue: 9,
      required: true
    }
  ],
  validator: function (form) {
    if (form.topN <= 0) {
      return '請輸入顯示數量'
    }
  },
  onConnections: function (connections) {
    if (!global.store) {
      global.store = {
        ipRecords: {},
        hostRecords: {}
      }
    }

    if (!global.cache) {
      global.cache = new Set()
    }

    if (global.cache.size > 5000) {
      global.cache.clear()
    }

    for (const connection of connections) {
      if (connection.end && connection.state === 'closed' && !global.cache.has(connection.id)) {
        global.cache.add(connection.id)

        if (connection.metadata.host) {
          const host = getHost(connection.metadata)
          const size = global.store.hostRecords[host]
          global.store.hostRecords[host] = size === undefined ? 1 : +size + 1
        }

        if (connection.metadata.destinationIP) {
          const ip = connection.metadata.destinationIP
          const size = global.store.ipRecords[ip]
          global.store.ipRecords[ip] = size === undefined ? 1 : +size + 1
        }
      }
    }
  }
}
