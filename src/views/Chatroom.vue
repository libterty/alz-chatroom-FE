<template>
    <b-container class="py-5">
        <div v-if="isShow">
            <Chatroom
                :initMessages="initMessages"
                @after-submit-message="afterSubmitMessage"
            />
        </div>
    </b-container>
</template>

<script>
import Chatroom from '../components/Chatroom.vue';
import Request from '../api/index';
const request = new Request();

export default {
    name: 'chatroom',
    components: {
        Chatroom
    },
    data() {
        return {
            initMessages: [],
            isShow: false
        }
    },
    async created() {
        const res = await request.getMessages();
        if (res.status === 'success') {
            this.initMessages = res.messages
            this.isShow = true;
        }
    },
    methods: {
        async afterSubmitMessage(data) {
            const res = await request.postMessage(data);
            if (res.status === 'success') {
                const res = await request.getMessages();
                this.initMessages = res.messages
                this.isShow = true;
            }
        }
    }
}
</script>