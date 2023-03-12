// Used a ternary operator to check if the user has an admin access based on userTokenData.access 
export default function adminRoleChecker(userTokenData) {
    // checks if the value of userTokenData.access is admin if True access granted if not then Insufficientpermission
    return userTokenData.access === 'admin' ? Promise.resolve('Access granted') : Promise.reject("InssuficientPermission")
}

module.exports = adminRoleChecker;