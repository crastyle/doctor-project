
export default {
    validate: {
        isTelephone(val) {
            return /^1\d{10}$/.test(val)
        },
        isNumber(val) {
            return /^\d+$/.test(val)
        },
        isUserName(val) {
            return !!val
        },
        isValicode(val) {
            return /^\d{6}$/.test(val)
        },
        isDoctorCard(val) {
            return /^\d{7}$/.test(val)
        }
    }
}