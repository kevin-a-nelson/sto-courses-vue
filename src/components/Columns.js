import { departments } from './dropDownItems/Departments'
import { ges } from './dropDownItems/Ges'

export default [
  { label: 'Status', 
    field: 'status',
    filterOptions: {
      placeholder: 'All',
      enabled: false,
      filterDropdownItems: [
        {text: 'Open', value: 'O'},
        {text: 'Closed', value: 'C'},
      ],
    }
  },
  { label: 'Name', 
    field: 'name',
    filterOptions: {
      placeHolder: 'All',
      enabled: false,
    }
  },
  { 
    label: 'Dept', 
    field: 'dept_num_sec',
    filterOptions: {
      enabled: false,
      placeholder: 'All',
      filterValue: '',
      filterDropdownItems: departments()
    }
  },
  { label: 'Gereqs', 
    field: 'gereqs',
    filterOptions: {
      placeholder: 'Any',
      enabled: false,
      filterDropdownItems: ges()
    }
  },
  {
    label: 'Days', 
    field: 'days',
    filterOptions: {
      placeHolder: 'All',
      enabled: false,
    }
  },
  { label: 'Times', 
    field: 'times',
    filterOptions: {
      placeHolder: 'All',
      enabled: false,
    }
  },
  { label: 'Prof', 
    field: 'prof',
    hidden: true,
    filterOptions: {
      placeHolder: 'All',
      enabled: false,
    }
  },
  { label: 'Rating', 
    field: 'rating',
    hidden: false,
    filterOptions: {
      placeHolder: 'All',
      enabled: false,
    },
    type: 'number'
  },
  { label: 'Difficulty', 
    field: 'difficulty',
    hidden: false,
    filterOptions: {
      placeHolder: 'All',
      enabled: false,
    },
    type: 'number'
  },
  { label: 'Reviews', 
    field: 'reviews',
    hidden: false,
    filterOptions: {
      placeHolder: 'All',
      enabled: false,
    },
    type: 'number'
  },
  { label: 'Prereqs', 
    field: 'has_prereqs',
    filterOptions: {
      placeHolder: 'All',
      enabled: false,
    }
  },
  { label: 'Actions', 
    field: 'actions',
    filterOptions: {
      placeHolder: 'All',
      enabled: false,
    }
  },
]