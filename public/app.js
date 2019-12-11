function googleLogin() {
    let provider = new firebase.auth.GoogleAuthProvider()

    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user
            document.write(`hello ${user.displayName}`)
            console.log(user)
        })
        .catch(console.log)
}