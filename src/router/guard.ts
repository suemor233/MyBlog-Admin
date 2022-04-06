import QProgress from 'qier-progress'
import { router } from './router'
const qprogress = new QProgress()
router.beforeEach( async (to) => {
  qprogress.start()
  if (to.meta.isPublic) {
    return
  } else {
    return
  }
})

router.afterEach((to, _) => {
  qprogress.finish()

})


router.onError(() => {
  return
})

function getPageTitle(pageTitle?: string | null) {

}
