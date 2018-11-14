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
                    
                                {{item.description}}

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
                <section class="has-text-right">
                    <a class="button is-success" @click="showCreate=true">Create new</a>
                </section>
<!-- start edit modal -->
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
<!-- end edit modal -->
<!-- create new modal -->
<div class="modal has-text-left" :class="{'is-active': showCreate}">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Create new club</p>
      <button class="delete" aria-label="close" @click="showCreate=false"></button>
    </header>
    <section class="modal-card-body">
        <div class="field">
                        <label class="label">Name</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Club Name" v-model="createClub.name">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Description</label>
                        <div class="control">
                           <textarea class="textarea" placeholder="Club Description" v-model="createClub.description"></textarea>
                        </div>
                    </div>
                    
    </section>
    <footer class="modal-card-foot" >
      <button class="button is-success" @click="add()" :class="{'is-loading':loading}">Create</button>
      <button class="button" @click="showCreate=false" >Cancel</button>
    </footer>
  </div>
</div>

<!-- end create new modal -->
                
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
      showCreate:false, //toggles create modal
      currentClub:{}, //current club selected to be edited. 
      createClub:{},//new club to be created.
      currentIndex:0, //index used for editing clubs
      notificationActive:false,
      loading:false,
    }
  },
  mounted() {
      this.getClubs();
  },
  methods: {
      add() {
        
        this.loading=true;
        let data= {"club": {
            "name": this.createClub.name,
            "description": this.createClub.description,
        }}

        this.$http.post(this.$baseUrl+"/owner/clubs/",data,{headers: this.$headers}).then(response => {
        this.showCreate=false;
        this.notificationText="Successfully created new club. "
        this.notificationActive=true;
        this.loading=false;
        this.clubs.push(this.createClub);


        })
        .catch((error) => {
            this.loading=false;
            this.handleError(error);
        });
      },

      //displays edit modal
      edit(id){
          this.currentClub=JSON.parse(JSON.stringify(this.clubs[id])); //clone object for editing
          this.showEdit=true;
          this.currentIndex=id;
          
      },

      //saves edit modal details
      saveEdit(){
        
        this.loading=true;
        
        let data= {"club": {
            "name": this.currentClub.name,
            "description": this.currentClub.description,
        }}

        this.$http.put(this.$baseUrl+"/owner/clubs/"+this.currentClub.id,data,{headers: this.$headers}).then(response => {
        this.showEdit=false;
        this.notificationText="Successfully saved club details. "
        this.notificationActive=true;
        
        this.$set(this.clubs, this.currentIndex, this.currentClub)
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
     })
    .catch((error) => {
      //check if got a response from the server
       this.handleError(error);
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