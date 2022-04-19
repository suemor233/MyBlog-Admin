import QProgress from 'qier-progress'
import { router } from './router'
import { checkLogined } from '@/api/modules/user'
import { getToken, removeToken } from '@/utils/auth'
import appStore from "@/store";


const qprogress = new QProgress()
router.beforeEach(async (to) => {
  qprogress.start()
  const { success } = (await checkLogined()) as UmiType
  if (to.meta.isPublic) {
    if (success) {
      return '/dashboard'
    }
  } else {
    const { success } = (await checkLogined()) as UmiType
    if (!success) {
      removeToken()
      appStore.useUser.user.username = ''
      appStore.useUser.user.password = ''
      return '/Login'
    }
  }
})

router.afterEach((to, _) => {
  qprogress.finish()
})

router.onError(() => {
  return
})
