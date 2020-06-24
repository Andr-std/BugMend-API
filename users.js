const userArray = [];

const addUser = (({ id, name, isInstructor }) => {
    console.log(id, name, isInstructor)
    name = name.trim().toLowerCase();

    const existingUser = userArray.find((user) => user.name === name)
    if (existingUser) {

        return { error: 'Username is taken' };
    }
    const user = { id, name, isInstructor }

    return user;
})

const removeUser = ((id) => {
    const index = userArray.findIndex((user) => user.id === id)

    if (index !== -1) {
        return userArray.splice(index, 1)[0];
    }

})

const getUser = (id) => userArray.find((user) => user.id === id)


module.exports = { addUser, removeUser, getUser }
