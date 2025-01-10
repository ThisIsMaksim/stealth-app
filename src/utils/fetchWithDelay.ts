export type Action<T> = (error?: string, data?: T) => void

export async function fetchWithDelay<Req, Res>(
  request: (request: Req, action: Action<Res>) => Generator<Promise<Response> | Generator<unknown, void, unknown>, void, unknown>,
  args: Req,
  delay = 2000,
) {
  let result

  await Promise.all([
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      await request(args, (error, data) => {
        result = {
          error,
          data,
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        resolve()
      })
    }),
    new Promise(resolve => setTimeout(resolve, delay))
  ])

  return result
}