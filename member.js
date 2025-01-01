function skillsMember() {
    return {
        name: 'John Doe',
        age: 25,
        skills: ['HTML', 'CSS', 'JS'],
        // Method
        showSkills: function() {
            this.skills.forEach(function(skill) {
                console.log(skill);
            });
        }
    };
}

