<template>
    <div>
    <b-card no-body class="overflow-hidden">
        <b-row no-gutters>
            <b-col md="4">
                <b-card-img src="https://picsum.photos/400/400/?image=20" class="rounded-0"></b-card-img>
            </b-col>
            <b-col md="8">
                <b-card-body title="簡易聊天室">
                    <b-list-group flush class="chatroom-board">
                        <b-list-group
                            v-for="msg in initMessages"
                            :key="msg.id"
                            :class="msg.UserId | isUser"
                        >
                            <strong>
                                {{msg.username}}
                            </strong>
                            <small>
                                {{msg.message}}
                                <em>{{msg.createdAt | convertTime}}</em>
                            </small>
                        </b-list-group>
                    </b-list-group>
                    <br />
                    <b-form @submit.stop.prevent="submitNewMessage">
                        <b-form-group id="message" label="輸入新訊息:" label-for="message">
                            <b-form-input
                                id="message"
                                v-model="form.message"
                                required
                                placeholder="輸入新訊息"
                            ></b-form-input>
                        </b-form-group>
                        <b-button type="submit" variant="success" size="sm">Submit</b-button>
                    </b-form>
                </b-card-body>
            </b-col>
        </b-row>
    </b-card>
    </div>
</template>

<script>
import moment from 'moment';
const auth = JSON.parse(localStorage.getItem('credit')) || null;

export default {
    props: {
        initMessages: {
            type: Array
        }
    },
    filters: {
        convertTime(time) {
            if (!time) return;
            return moment(time).fromNow();
        },
        isUser(id) {
            if (id === auth.user.id) return 'text-right';
            return 'text-left';
        }
    },
    data() {
        return {
            form: {
                message: '',
                UserId: auth.user.id
            }
        }
    },
    methods: {
        submitNewMessage() {
            const data = JSON.stringify(this.form);
            this.$emit('after-submit-message', data);
        }
    },
    watch: {
        initMessages: function(updateData) {
            this.initMessages = updateData;
        }
    }
}
</script>

<style scoped>
.chatroom-board {
    max-height: 560px;
    overflow-y: scroll;
}
</style>