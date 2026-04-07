import type { Config } from "@react-router/dev/config"

export default {
  ssr: false,
  prerender: true,
  future: {
    v8_middleware: true,
    v8_splitRouteModules: true,
    v8_viteEnvironmentApi: true,
  },
} satisfies Config
