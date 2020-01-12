export default {
  items: [
    {
      name: 'Announcements',
      url: '/announcements',
      icon: 'cui-home'
    },
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'cui-chart'
    },
    {
      name: 'Transactions',
      url: '/transactions',
      icon: 'cui-british-pound'
    },
    {
      name: 'Wages',
      url: '/wages',
      icon: 'cui-briefcase'
    },
    {
      name: 'Properties',
      url: '/properties?view=owned',
      icon: 'cui-home',
      children: [
        {
          name: 'My Properties',
          url: '/properties?view=owned'
        },
        {
          name: 'Property Market',
          url: '/properties?view=all'
        }
      ]
    },
    {
      name: 'Bets',
      url: '/bets',
      icon: 'cui-note'
    },
    {
      name: 'Rich List',
      url: '/rich-list/personal',
      icon: 'cui-list',
      children: [
        {
          name: 'People',
          url: '/rich-list/personal'
        },
        {
          name: 'Company',
          url: '/rich-list/company'
        }
      ]
    },
    {
      name: 'Staff',
      url: '/staff',
      icon: 'cui-user'
    },
    {
      name: 'Admin',
      url: '/admin',
      icon: 'icon-list',
      admin: true,
      children: [
        {
          name: 'Accounts',
          url: '/admin/accounts'
        },
        {
          name: 'Account Types',
          url: '/admin/account-types'
        },
        {
          name: 'Bets',
          url: '/admin/bets'
        },
        {
          name: 'Economy',
          url: '/admin/economy'
        },
        {
          name: 'Properties',
          url: '/admin/properties'
        },
        {
          name: 'Wage Management',
          url: '/admin/wages'
        }
      ]
    }
  ]
}