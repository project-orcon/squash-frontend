export default {
    methods: {
        handleError(error) {
            if (!error.response){
            this.errorHeader="Unable to connect to server."
            return;
        }
        if(error.response.status==401){
          this.$router.push('/login')
        }
        },
    },
};
