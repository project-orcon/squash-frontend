<template>
  <div class="home">

<section class="hero is-primary is-fullheight court-img">
  <!-- Hero head: will stick at the top -->
  <div class="hero-head">
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item">
            <img src="@/assets/clogo.png" alt="Logo">
          </a>
          <span class="navbar-burger burger" data-target="navbarMenuHeroA">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenuHeroA" class="navbar-menu">
          <div class="navbar-end">
            <a class="navbar-item is-active">
              Home
            </a>
            <a class="navbar-item" @click="$router.push('/login')">
              Login 
            </a>
            <a class="navbar-item">
              Documentation
            </a>
            <span class="navbar-item">
              <a class="button is-primary is-inverted">
                <span class="icon">
                  <i class="fab fa-github"></i>
                </span>
                <span>Download</span>
              </a>
            </span>
          </div>
        </div>
      </div>
    </nav>
  </div>

  <!-- Hero content: will be in the middle -->
  <div class="hero-body">
    <div class="container ">
      <div class="columns">
        <div class="column is-one-third has-text-left notification is-primary" style="padding:40px;">
      <div class="title">
        Manage your court bookings easily. 
      </div>
      <div class="subtitle">
        <br>
        Court11 handles bookings and payments for tennis and squash clubs.
      </div>
      
     </div>
      </div>
      </div>
    </div>
  

  <!-- Hero footer: will stick at the bottom -->
  <div class="hero-foot">
    <nav class="tabs">
      <div class="container">
        <ul>
          <li class="is-active"><a>Overview</a></li>
          <li><a>Modifiers</a></li>
          <li><a>Grid</a></li>
          <li><a>Elements</a></li>
          <li><a>Components</a></li>
          <li><a>Layout</a></li>
        </ul>
      </div>
    </nav>
  </div>
</section>

<section >
  <div class="tile is-ancestor">
  <div class="tile is-parent">
    <article class="tile is-child box">
      <p class="title">One</p>
      <p class="subtitle">Subtitle</p>
    </article>
  </div>
  <div class="tile is-parent">
    <article class="tile is-child box">
      <p class="title">Two</p>
      <p class="subtitle">Subtitle</p>
    </article>
  </div>
  <div class="tile is-parent">
    <article class="tile is-child box">
      <p class="title">Three</p>
      <p class="subtitle">Subtitle</p>
    </article>
  </div>
 
</div>
</section>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home'
}
</script>
<style scoped>
.court-img{   
  background:url('../assets/court2.jpg') bottom left;
  background-size:cover;
  padding:20px;
}
</style>
