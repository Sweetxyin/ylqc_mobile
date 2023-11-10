const TABBAR = [
	{
	pagePath: "/pages/index/index",
	text: "首页",
	iconPath: "@/static/images/tab_icon/index.png",
	selectedIconPath: "@/static/images/tab_icon/index_active.png",
	type: "1",
}, {
	pagePath: "/pages/order/orderlist/orderlist",
	text: "订单",
	iconPath: "@/static/images/tab_icon/order.png",
	selectedIconPath: "@/static/images/tab_icon/order_active.png",
	type: "2",
}, {
	pagePath: "/pages/message/message",
	text: "消息",
	iconPath: "@/static/images/tab_icon/message.png",
	selectedIconPath: "@/static/images/tab_icon/message_active.png",
	type: "3",
}, {
	pagePath: "/pages/shop/shop",
	text: "商城",
	iconPath: "@/static/images/tab_icon/shop.png",
	selectedIconPath: "@/static/images/tab_icon/shop_active.png",
	type: "4",
}, {
	pagePath: "/pages/user/user",
	text: "我的",
	iconPath: "@/static/images/tab_icon/user.png",
	selectedIconPath: "@/static/images/tab_icon/user_active.png",
	type: "5",
}, {
	text: "抢单",
	pagePath: "/pages/seizeorders/seizeorders",
	iconPath: "@/static/images/tab_icon/seize.png",
	selectedIconPath: "@/static/images/tab_icon/seize_active.png",
	type: "6",
}, {
	text: "订单",
	pagePath: "/pages/order/order",
	iconPath: "@/static/images/tab_icon/order.png",
	selectedIconPath: "@/static/images/tab_icon/order_active.png",
	type: "7",
}, {
	text: "换电",
	pagePath: "/pages/change_electricity/change_electricity", 
	iconPath: "@/static/images/tab_icon/change.png",
	selectedIconPath: "@/static/images/tab_icon/change_active.png",
	type: "8",
},
]


const clearTabbarList = [{
	"pagePath": "/pages/defalutStart/defalutStart",
	"text": "null界面"
}, {
	"pagePath": "/pages/ber/nullPage1/nullPage2",
	"text": "null界面"
}, {
	"pagePath": "/pages/ber/nullPage1/nullPage3",
	"text": "null界面"
}, {
	"pagePath": "/pages/ber/nullPage1/nullPage5",
	"text": "null界面"
}]

/* export const userRoleIndexPath=(role)=> {
	if (role === '1') {
		return '/pages/index/index'
	}
	if (role === '2') {
		return '/pages/seizeorders/seizeorders'
	}else{
		return '/pages/index/index'
	}

}

export const setOfficialTabbar = (role, tabList) => {
	let list = JSON.parse(JSON.stringify(TABBAR))
	let newList = []
	tabList.forEach(v => {
		let index = list.findIndex(cValue => cValue.type === v)
		if (index !== -1) {
			newList.push(list[index])
		}
	})
	let hideIndex = 5 - newList.length
	newList.forEach((v, index) => {
		uni.setTabBarItem({
			pagePath: v.pagePath,
			text: v.text,
			iconPath: v.iconPath,
			selectedIconPath: v.selectedIconPath,
			index,
		})
	})
	if (hideIndex !== 0) {
		for (let i = 1; i <= hideIndex; i++) {
			uni.setTabBarItem({
				visible: false,
				index: 5 - i
			})
		}
	}
	//return userRoleIndexPath(role)
}
 */
function userRoleIndexPath(role) {
	if (role === '1') {
		return '/pages/index/index'
	}
	if (role === '2') {
		return '/pages/seizeorders/seizeorders'
	}else{
		return '/pages/index/index'
	}
}

export const setOfficialTabbar = (role, tabList) => {
	let list = JSON.parse(JSON.stringify(TABBAR))
	let newList = []
	tabList.forEach(v => {
		let index = list.findIndex(cValue => cValue.type === v)
		if (index !== -1) {
			newList.push(list[index])
		}
	})
	let hideIndex = 4 - newList.length
	newList.forEach((v, index) => {
		uni.setTabBarItem({
			pagePath: v.pagePath,
			text: v.text,
			index,
		})
	})
	if (hideIndex !== 0) {
		for (let i = 1; i <= hideIndex; i++) {
			uni.setTabBarItem({
				visible: false,
				index: 4 - i
			})
		}
	}
	return userRoleIndexPath(role)
}

export const cleaarTabbar = () => {
	clearTabbarList.forEach(v => {
		uni.setTabBarItem({
			pagePath: v.pagePath,
			text: v.text,
			iconPath: v.iconPath,
			selectedIconPath: v.selectedIconPath,
			index: v.index,
			visible: true,
		})
	})
}