<template>
    <b-navbar type="dark" variant="dark">
        <b-navbar-brand href="/">聊天室</b-navbar-brand>
        <b-navbar-toggle 
            target="nav-collapse"
        >
            <span class="navbar-toggler-icon" />
        </b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item
                    v-if="user.isAdmin"
                    :href="'/admin'"
                    class="text-white mr-2"
                >
                    <p>管理員後台</p>
                </b-nav-item>
                <b-nav-item 
                    class="text-white mr-2"
                >
                    <p>{{user.name | avoidNull}} 您好</p>
                </b-nav-item>
                <b-button
                    v-if="user.id"
                    size="sm"
                    @click.stop.prevent="logOutUser"
                    type="button" 
                    variant="outline-primary my-2 my-sm-0"
                >
                    登出
                </b-button>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import Request from '../api';
const request = new Request();
const credit = JSON.parse(localStorage.getItem('credit'));

export default {
    name: 'Navbar',
    data() {
        return {
            authUser: credit || {},
            user: {}
        }
    },
    async created() {
        if (credit) {
            try {
                this.user = await request.getCurrentUser();
            } catch (error) {
                throw new Error(error.message);
            }
        }
    },
    methods: {
        async logOutUser() {
            try {
                if (credit) {
                    localStorage.clear('credit');
                    this.$router
                        .go({ path: '/signin' })
                        .catch(e => console.log(e));
                    this.user = {}
                }
            } catch (error) {
                throw new Error(error.message);
            }
        }
    },
    filters: {
        avoidNull(name) {
            if(!name) return '使用者';
            return name;
        }
    },
    watch: {
        authUser: function(updateData) {
            this.authUser = updateData;
        },
        user: function(updateData) {
            this.user = updateData;
        }
    }
}
</script>

<style scoped>
@media screen and (max-width: 425px) {
    a.navbar-brand {
        font-size: x-small;
    }

    p {
        margin: 0;
        font-size: small;
        white-space: nowrap;
    }
}
p {
    margin-top: 0.5rem;
}
</style>