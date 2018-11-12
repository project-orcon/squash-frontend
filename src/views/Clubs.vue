<template>
  <div class="dashboard">
        <div class="container">
<div class="notification is-primary" v-if="notificationActive">
  <button class="delete" @click="notificationActive=false"></button>
  {{notificationText}}
</div>


            <div class="columns">
                <div class="column is-3">
                    <Menu></Menu>
                </div>
                <div class="column is-9 has-background-light">

                    <b-notification auto-close type="is-primary" :active.sync="noficationActive">
            
        </b-notification>
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                    <ul>
                        <li><a href="../">Home</a></li>
                        <li><a href="../">Templates</a></li>
                        <li><a href="../">Examples</a></li>
                        <li class="is-active"><a href="#" aria-current="page">Admin</a></li>
                    </ul>
                </nav>
                <section class="hero is-info welcome is-small has-text-left">
                    <div class="hero-body">
                        <div class="container">
                            <h1 class="title">
                                My Clubs
                            </h1>
                            <h2 class="subtitle">
                                Manage your club details here
                            </h2>
                        </div>
                    </div>
                </section>
                <section >
                    <div v-for="(item,index) in clubs" :key="index">
                        <div class="card space">
                            <div class="card-header">
                                <p class="card-header-title">{{item.name}} </p>
                            </div>
                            <div class="card-content">
                                <div class="content has-text-left">
                    
                                {{item.description}}{{item.id}}

                                <div class="has-text-right">
                                    <a class="button is-primary" @click="edit(index)">
                                        <span class="icon">
                                        <i class="fas fa-edit"></i>
                                        </span>
                                        <span>Edit</span>
                                    </a>
                                </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

  <div class="modal has-text-left" :class="{'is-active': showEdit}">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Edit club</p>
      <button class="delete" aria-label="close" @click="showEdit=false"></button>
    </header>
    <section class="modal-card-body">
        <div class="field">
                        <label class="label">Name</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Club Name" v-model="currentClub.name">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Description</label>
                        <div class="control">
                           <textarea class="textarea" placeholder="Club Description" v-model="currentClub.description"></textarea>
                        </div>
                    </div>
                    
    </section>
    <footer class="modal-card-foot" >
      <button class="button is-success" @click="saveEdit()" :class="{'is-loading':loading}">Save</button>
      <button class="button" @click="showEdit=false" >Cancel</button>
    </footer>
  </div>
</div>

                
                </div>
            </div>
        </div>
  </div>
</template>
<script>
import Menu from '@/components/menu'

export default {
  name: 'dashboard',
  data() { return {
      clubs:[],
      showEdit:false, //toggles edit modal
      currentClub:{}, //current club selected to be edited. 
      notificationActive:false,
      loading:false
    }
  },
  mounted() {
      this.getClubs();
  },
  methods: {
      edit(id){
          this.currentClub=this.clubs[id];
          this.showEdit=true;
          console.log(this.currentClub);
      },
      saveEdit(){
        
        this.loading==true;
        let data= {"club": {
            "name": this.currentClub.name,
            "description": this.currentClub.description,
        }}

        console.log(data);
        this.$http.put(this.$baseUrl+"/owner/clubs/"+this.currentClub.id,data,{headers: this.$headers}).then(response => {
        this.showEdit=false;
        this.notificationText="Successfully saved club details. "
        this.notificationActive=true;
        
        this.loading=false;
        })
        .catch((error) => {
            this.loading=false;
            this.handleError(error);
        });
      },

      getClubs() {
        let headers = {
       "Content-Type": "application/json",
       "Authorization": localStorage.getItem('token')
        }  

     
     this.$http.get(this.$baseUrl+'/owner/clubs',{headers: headers}).then(response => {

         this.clubs=response.data;
         console.log(this.clubs)
     })
    .catch((error) => {
      //check if got a response from the server
      if (!error.response){
        this.errorHeader="Unable to connect to server."
        return;
      }
      if(error.response.status==401){
          this.$router.push('/login')
      }
        this.errorHeader=error.response.message;
      });
        
      
      }
  

  },
  components: {
      Menu
  }
}
</script>
<style scoped>
.space {
    margin:10px 0;
}

</style>