<template>
    <b-container class="py-5">
        <h1>管理員頁面</h1>
        <div v-if="isShow">
            <AdminUsersTable
                :initUsers="initUsers"
                @after-submit-IsAdmin="afterSubmitIsAdmin"
                @after-submit-delete="afterSubmitDelete"
            />
        </div>
    </b-container>
</template>

<script>
import AdminUsersTable from '../components/AdminUsersTable.vue';
import Request from '../api/index';
const request = new Request();

export default {
    components: {
        AdminUsersTable
    },
    data() {
        return {
            initUsers: [],
            isShow: false
        }
    },
    async created() {
        try {
            const res = await request.getUsers();
            this.initUsers = res.users.sort((a, b) => b.id - a.id);
            this.isShow = true;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    methods: {
        async afterSubmitIsAdmin(cId, isAdmin) {
            const res = await request.putAdminUser(cId, isAdmin);
            if (res.status === 'success') {
                const res = await request.getUsers();
                this.initUsers = res.users.sort((a, b) => b.id - a.id);
                this.isShow = true;
            }
        },
        async afterSubmitDelete(cId) {
            const res = await request.deleteUser(cId);
            if (res.status === 'success') {
                const res = await request.getUsers();
                this.initUsers = res.users.sort((a, b) => b.id - a.id);
                this.isShow = true;
            }
        }
    }
}
</script>