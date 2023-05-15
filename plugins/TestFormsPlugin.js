module.exports = {
  name: '表單測試',
  version: '1.0.0.beta',
  author: '@uutzlpikvq6852',
  icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjg0MTU3OTMzOTIwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI3MjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTYyMi44NDggNjguNjA4SDE3OS40NTZjLTMwLjU5MiAwLTU1LjQyNCAyNC44MzItNTUuNDI0IDU1LjQyNHY3NzYuMDY0YzAgMzAuNTkyIDI0LjgzMiA1NS40MjQgNTUuNDI0IDU1LjQyNGg2NjUuMDg4YzMwLjU5MiAwIDU1LjQyNC0yNC44MzIgNTUuNDI0LTU1LjQyNHYtNTU0LjI0TDYyMi44NDggNjguNjA4eiIgZmlsbD0iIzREQjIyMiIgcC1pZD0iMjcyMiI+PC9wYXRoPjxwYXRoIGQ9Ik02MjIuODQ4IDY4LjYwOHYyMjEuNjk2YzAgMzAuNTkyIDI0LjgzMiA1NS40MjQgNTUuNDI0IDU1LjQyNGgyMjEuNjk2TDYyMi44NDggNjguNjA4eiIgZmlsbD0iIzczQzk0QiIgcC1pZD0iMjcyMyI+PC9wYXRoPjxwYXRoIGQ9Ik02NzguMjcyIDM0NS43MjhsMjIxLjY5NiAyMjEuNjk2VjM0NS43MjhINjc4LjI3MnoiIGZpbGw9IiM0QkE1MjEiIHAtaWQ9IjI3MjQiPjwvcGF0aD48cGF0aCBkPSJNNDg0LjIyNCA0ODQuMzUyaDI0OS40NzJWNTk1LjJINDg0LjIyNHYtMTEwLjg0OHogbS0xOTMuOTIgMGgxNjYuMjcyVjU5NS4ySDI5MC4zMDR2LTExMC44NDh6IG0xOTMuOTIgMTM4LjQ5NmgyNDkuNDcydjgzLjJINDg0LjIyNHYtODMuMnogbS0xOTMuOTIgMGgxNjYuMjcydjgzLjJIMjkwLjMwNHYtODMuMnogbTE5My45MiAxMTAuODQ4aDI0OS40NzJ2ODMuMkg0ODQuMjI0di04My4yeiBtLTE5My45MiAwaDE2Ni4yNzJ2ODMuMkgyOTAuMzA0di04My4yeiIgZmlsbD0iI0ZGRkZGRiIgcC1pZD0iMjcyNSI+PC9wYXRoPjwvc3ZnPg==',
  forms: [
    {
      type: 'number',
      key: 'number',
      label: 'number',
      defaultValue: 9,
      required: true
    },
    {
      type: 'text',
      key: 'text',
      label: 'text',
      defaultValue: 'hell',
      required: true
    },
    {
      type: 'netRuleEditor',
      key: 'netRuleEditor',
      label: 'netRuleEditor',
      required: false,
      enum: ['IPv4', 'IPv6'],
      allowSuffix: false
    },
    {
      type: 'switch',
      key: 'switch',
      label: 'switch',
      defaultValue: false,
      required: true
    }
  ],
  validator: function (form) {
    if (form.number === 9) {
      return '請輸入顯示數量'
    }
    // return form.topN !== 9
  }
}
