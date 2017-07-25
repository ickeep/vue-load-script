'use strict'

function plugin(Vue) {
  if (!plugin.installed) {
    /* eslint-disable no-param-reassign */
    const loadScriptList = {}

    Vue.prototype.$loadScript = async function (url, script, maxTime = 10000, time = 100) {
      if (process.browser) {
        if (script && window[script]) {
          return true
        }
        if (!loadScriptList[url]) {
          loadScriptList[url] = 'loading'
          return new Promise(async (resolve) => {
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = url
            document.body.appendChild(script)

            script.addEventListener('load', () => {
              loadScriptList[url] = true
              resolve(true)
            })
            script.addEventListener('error', () => {
              resolve(false)
            })
            script.addEventListener('abort', () => {
              resolve(false)
            })
          })
        }
        if (loadScriptList[url] === 'loading' && script) {
          return new Promise((resolve) => {
            const intervalId = setInterval(() => {
              if (window[script]) {
                clearInterval(intervalId)
                resolve(true)
              }
              maxTime -= time
              if (maxTime < 0) {
                clearInterval(intervalId)
                resolve(false)
              }
            }, time)
          })
        }
      }
      return false
    }
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;
