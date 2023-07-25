function showToast(title, options) {
	let _options = Object.assign({
		mask: false,
		icon: 'none',
		duration: 2000,
		position: 'center'
	}, options)
	uni.showToast({
		title,
		..._options
	})
}


function formatLocation(longitude, latitude) {
    if (typeof longitude === 'string' && typeof latitude === 'string') {
        longitude = parseFloat(longitude)
        latitude = parseFloat(latitude)
    }
    longitude = longitude.toFixed(2)
    latitude = latitude.toFixed(2)
    return {
        longitude: longitude.toString().split('.'),
        latitude: latitude.toString().split('.')
    }
}
module.exports = {
	showToast:showToast,
	formatLocation: formatLocation,
	}