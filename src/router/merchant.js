/**
 * Created by PhpStorm.
 * User: caoqs
 * Date: 2018/11/1
 * Time: 下午8:39
 */

let Layout = (resolve) => require(['../views/layout/Layout'], resolve)

//  动态路由
export const merchantRoute = [

    // {
    //     path: '/',
    //     component: Layout,
    //     redirect: '/club'
    // },

    // {
    //     path: '/club',
    //     component: (resolve) => require(['@/views/merchant/login/index'], resolve),
    //     meta: { role: [2] },
    // },
    {
        path: '/',
        component: Layout,
        redirect: '/ad'
    },

    // {
    //     path: '/club',
    //     component: (resolve) => require(['@/views/merchant/login/index'], resolve),
    //     meta: { role: [2] },
    // },
    {
        path: '/ad',
        component: Layout,
        redirect: '/ad/serving',
        name: 'Ad',
        meta: { title: '广告投放', icon: 'example', role: [2] },
        children: [
            {
                path: 'serving',
                name: 'serving',
                component: (resolve) => require(['@/views/merchant/ad/serving/index'], resolve),
                meta: { title: '广告投放', icon: 'example', role: [2] },
                hidden: false,
            },
            {
                path: 'create',
                name: 'create',
                component:  (resolve) => require(['@/views/merchant/ad/serving/create/index'], resolve),
                meta: { title: '新建投放', role: [2], noCache: true },
                hidden: true,
                // children: [
                //     {
                //         path: 'set-price',
                //         name: 'set-price',
                //         component: (resolve) => require(['@/views/merchant/ad/serving/create/set-price/index'], resolve),
                //         meta: { title: '设置投放金额', role: [2], noCache: true },
                //         hidden: true,
                //     }
                // ]
            },
            {
                path: 'set-price',
                name: 'set-price',
                component: (resolve) => require(['@/views/merchant/ad/serving/create/set-price/index'], resolve),
                meta: { title: '设置投放金额', role: [2], noCache: true },
                hidden: true,
            },
            {
                path: 'detail',
                name: 'detail',
                component: (resolve) => require(['@/views/merchant/ad/serving/detail/index'], resolve),
                meta: { title: '广告详情', role: [2] },
                hidden: true,
            },

        ]
    },
    {
        path: '/management',
        name: 'management',
        component: Layout,
        redirect: '/management/index',
        meta: {title: '数据管理', icon: 'table', role: [2]},
        children: [
            {
                path: 'index',
                name: 'management-index',
                component:(resolve) => require(['@/views/merchant/data-management/index'], resolve),
                meta: { title: '数据管理', icon: 'table',role: [2] },
                hidden: false,
            }
        ]

    },
    {
        path: '/account',
        name: 'Account',
        component: Layout,
        redirect: '/account/index',
        meta: {title: '我的账户', icon: 'user'},
        children: [
            {
                path: 'index',
                name: 'account',
                component: () => import('@/views/merchant/account/index'),
                meta: { title: '我的账户', icon: 'user' },
                hidden: false,
            },
            {
                path: 'recharge',
                name: 'recharge',
                component: () => import('@/views/merchant/account/recharge/index'),
                meta: { title: '充值', icon: 'form' },
                hidden: false,
            }
        ]
    },

    { path: '*', redirect: '/404', hidden: true }
]
