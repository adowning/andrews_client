<template>
  <v-footer dark color="accent" height="auto">
        <v-btn
           class="mx-3 white--text"
          icon
            @click="drawer = !drawer"           
            >
          <v-icon size="32px">menu</v-icon>
        </v-btn>
<!--
    <v-bottom-sheet  v-model="sheet"
    :value="sheet"
    >
    
     <v-btn
        slot="activator"
      class="mx-3 white--text"
          icon
            @click="sheet = !sheet"           
            >
          <v-icon size="32px">menu</v-icon>
        </v-btn>

      <v-list>
        <v-list-tile
          v-for="tile in tiles"
          :key="tile.title"
          @click="sheet = false & $router.push('tile.link')"
        >
          <v-list-tile-avatar>
            <v-avatar size="32px" tile>
              <img
                src="../assets/logo.png"
                :alt="tile.title"
              >
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-title>{{ tile.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>

            <v-btn
           class="mx-3 white--text"
          icon
            @click="sheet = true"           
            >
          <v-icon size="32px">menu</v-icon>
        </v-btn>
    </v-bottom-sheet> -->

   

    <v-navigation-drawer
      v-model="drawer"
      light
      absolute
      temporary
    >
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile
          v-for="item in items"
          :key="item.title"
         :to="item.link"
        >

          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
        <v-spacer></v-spacer>
         <v-list-tile
         to="/settings"
        >

          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
    </v-navigation-drawer>
    <v-spacer></v-spacer>
  </v-footer>

</template>
<script>
  export default {
    data: () => ({
      sheet: false,
      drawer: false,
       items: [
          { title: 'Home', icon: 'dashboard', link:'/' },
          
          { title: 'Crew', icon: 'people', link:'/employee' },
          { title: 'About', icon: 'question_answer', link:'/about' }
        ],
      tiles: [
        { img: 'logo.png', title: 'Home', link: '/' },
        { img: 'home.png', title: 'Employees', link: '/employee' },
        // { img: 'inbox.png', title: 'Inbox' },
        // { img: 'hangouts.png', title: 'Hangouts' },
        // { img: 'messenger.png', title: 'Messenger' },
        // { img: 'google.png', title: 'Google+' }
      ]
    })
  }
</script>

<style>
</style>
