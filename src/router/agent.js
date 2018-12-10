/**
 * Created by PhpStorm.
 * User: caoqs
 * Date: 2018/11/1
 * Time: 下午8:38
 */

let Layout = (resolve) => require(['../views/layout/Layout'], resolve)

//  动态路由
export const agentRoute = [
    {
        path: '/',
        component: Layout,
        redirect: '/agent'
    },

    /// 商家
    {
        path: '/agent',
        name: 'agent',
        component: Layout,
        redirect: '/agent/index',
        meta: {title: '商家管理', icon: 'example', role: [1]},
        children: [
            {
                path: 'index',
                name: 'overview',
                component: (resolve) => require(['@/views/agent/agent-manage/index'], resolve),
                meta: { title: '商家管理', icon: 'form' ,role: [1]},
                hidden: false,
            },
            {
                path: 'create',
                name: 'create',
                component: (resolve) => require(['@/views/agent/agent-manage/create/index'], resolve),
                meta: { title: '新建商家', icon: 'form' ,role: [1]},
                hidden: false,
            },
            {
                path: 'agent-detail',
                name: 'agent-detail',
                component: (resolve) => require(['@/views/agent/agent-manage/agent-detail/index'], resolve),
                meta: { title: '商家详情', role: [1] },
                hidden: true,
                children: [
                    {
                        path: 'ad-detail',
                        name: 'ad-detail',
                        component: (resolve) => require(['@/views/agent/agent-manage/ad-detail/index'], resolve),
                        meta: { title: '广告详情', role: [1] },
                        hidden: true,
                    },
                ]
            },
            {
                path: 'termination',
                name: 'termination',
                component: (resolve) => require(['@/views/agent/agent-manage/termination/index'], resolve),
                meta: { title: '解绑申请', icon: 'form' ,role: [1]},
                hidden: false,
            },

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
                component: () => import('@/views/agent/account/index'),
                meta: { title: '账户', icon: 'user' },
                hidden: false,
            },
            {
                path: 'recharge',
                name: 'recharge',
                component: () => import('@/views/agent/account/recharge/index'),
                meta: { title: '充值', icon: 'form' },
                hidden: false,
            },
            {
                path: 'transfer',
                name: 'transfer',
                component: () => import('@/views/agent/account/transfer/index'),
                meta: { title: '转账', icon: 'form' },
                hidden: false,
            }
        ]
    },
    { path: '*', redirect: '/404', hidden: true }
]

