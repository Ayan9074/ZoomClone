import Login from './LoginForm.svelte'
import PageNotExists from './PageNotExists.svelte'
import SignUp from './SignUp.svelte'

export default [
	{
		path: '/login',
		component: Login
	},
  {
		path: '/SignUp',
		component: SignUp
	},
	{
		path: '*',
		component: PageNotExists
	}
]