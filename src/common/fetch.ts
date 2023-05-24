import { createFetch } from '@vueuse/core'

interface FetchOptionsProps {
  options: any
}

async function beforeFetch({ options }: FetchOptionsProps) {
  const myToken = ''
  options.headers.Authorization = `${myToken}`

  return { options }
}

async function afterFetch(ctx: any) {
  console.log('ctx', ctx)
  return ctx
}

function onFetchError(ctx: any) {
  // ctx.data can be null when 5xx response
  if (ctx.data === null)
    ctx.data = { title: 'Hunter x Hunter' } // Modifies the response data

  ctx.error = new Error('Custom Error') // Modifies the error

  return ctx
}

const useCustomFetch = createFetch({
  baseUrl: 'https://my-api.com',
  options: {
    beforeFetch,
    afterFetch,
    onFetchError
  },
  fetchOptions: {
    mode: 'cors',
  },
})

export default useCustomFetch