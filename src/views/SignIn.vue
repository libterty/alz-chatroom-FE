<template>
    <section>
        <b-container class="py-5" id="signin">
            <div class="text-center mb-4">
                <h1 class="h3 mb-3 font-weight-normal">
                Sign In
                </h1>
            </div>
            <b-form @submit="onSubmit" @reset="onReset">
                <b-form-group
                    id="email"
                    label="Email address:"
                    label-for="email"
                    description="We'll never share your email with anyone else."
                >
                    <b-form-input
                        id="email-input"
                        v-model="form.email"
                        type="email"
                        required
                        placeholder="Enter email"
                        ></b-form-input>
                </b-form-group>

                <b-form-group
                    id="password"
                    label="Your Password:"
                    label-for="password"
                    description="Please Input Your Password"
                >
                    <b-form-input
                        id="password-input"
                        v-model="form.password"
                        type="password"
                        required
                        placeholder="Enter password"
                    ></b-form-input>
                </b-form-group>

                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button type="reset" variant="danger" style="margin-left: 0.25rem">Reset</b-button>
            </b-form>
            <br>
            <router-link to="/signup">Don't have account ? Sign up !!</router-link>
        </b-container>
    </section>
</template>

<script>
import Request from '../api';
const request = new Request();

export default {
    name: 'SignIn',
    data() {
        return {
            form: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        async onSubmit(evt) {
            evt.preventDefault();
            confirm('Confirm to SignIn ?');
            if (this.form.email !== '' || this.form.password !== '') {
                const data = JSON.stringify(this.form);
                const res = await request.postSignIn(data);
                if (res.data.status === 'success') {
                    res.data.status === 'success' ? localStorage.setItem('credit', JSON.stringify(res.data)) : null;
                    this.$router
                        .go({ name: 'ChatRoom' })
                }
            } else {
                alert('Please fill in all the Form');
            }
        },
        onReset() {
            this.form.email = '',
            this.form.password = ''
        }
    }
}
</script>

<style scoped>
#signin {
    width: 50%;
}
</style>