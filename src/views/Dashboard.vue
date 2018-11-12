<template>
  <div class="dashboard">
        <div class="container">
            <div class="columns">
                <div class="column is-3">
                    <Menu></Menu>
                </div>
                <div class="column is-9">
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                    <ul>
                        <li><a href="../">Bulma</a></li>
                        <li><a href="../">Templates</a></li>
                        <li><a href="../">Examples</a></li>
                        <li class="is-active"><a href="#" aria-current="page">Admin</a></li>
                    </ul>
                </nav>
                <section class="hero is-info welcome is-small has-text-left">
                    <div class="hero-body">
                        <div class="container">
                            <h1 class="title">
                                Hello, Admin.
                            </h1>
                            <h2 class="subtitle">
                                I hope you are having a great day!
                            </h2>
                        </div>
                    </div>
                </section>
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

    }
  },
  methods: {
  

  },
  components: {
      Menu
  }
}
</script>
<style scoped>

</style>