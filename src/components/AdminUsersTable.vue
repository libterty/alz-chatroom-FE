<template>
    <div>
        <b-table-simple hover small caption-top responsive>
            <b-thead head-variant="dark">
                <b-th colspan="1">#</b-th>
                <b-th colspan="1">Email</b-th>
                <b-th colspan="1">Role</b-th>
                <b-th colspan="2">#</b-th>
            </b-thead>
            <b-tbody>
                <b-tr
                    v-for="user in this.initUsers"
                    :key="user.id"
                >
                    <b-td class="text-center">{{user.id}}</b-td>
                    <b-td class="text-center">{{user.email}}</b-td>
                    <b-td class="text-center">{{user.isAdmin | isAdmin}}</b-td>
                    <b-td class="text-center">
                        <b-button-group>
                            <b-button 
                                type="button"
                                size="sm"
                                variant="warning"
                                @click.stop.prevent="submitAuthority(user.id, user.isAdmin)"
                            >
                                {{user.isAdmin | setAuthority}}
                            </b-button>
                            <b-button 
                                type="button"
                                size="sm"
                                variant="danger"
                                @click.stop.prevent="submitDelete(user.id)"
                            >Delete</b-button>
                        </b-button-group>
                    </b-td>
                </b-tr>
            </b-tbody>
        </b-table-simple>
    </div>
</template>

<script>
export default {
    props: {
        initUsers: {
            type: Array
        }
    },
    filters: {
        isAdmin(a) {
            if (!a) return 'User';
            return 'Admin';
        },
        setAuthority(a) {
            if (!a) return 'Set as Admin';
            return 'Set as User';
        }
    },
    data() {
        return {
            form: {
                isAdmin: 'false'
            }
        }
    },
    methods: {
        submitAuthority(cId, isAdmin) {
            confirm(`Confirm to Change user's status`);
            if (isAdmin) {
                this.form.isAdmin = null;
            } else {
                this.form.isAdmin = 'true';
            }
            const data = JSON.stringify(this.form);
            this.$emit('after-submit-IsAdmin', cId, data);
        },
        submitDelete(cId) {
            confirm(`Confirm to delete user`)
            this.$emit('after-submit-delete', cId);
        }
    },
    watch: {
        initUsers: function(updateData) {
            this.initUsers = updateData;
        }
    }
}
</script>