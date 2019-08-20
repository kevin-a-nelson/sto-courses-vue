import { departments } from './dropDownItems/Departments'
import { ges } from './dropDownItems/Ges'

export default [
  { label: 'Status', 
    field: 'status',
    filterOptions: {
      placeholder: 'All',
      enabled: true,
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
      enabled: true,
    }
  },
  { label: 'Dept', 
    field: 'dept_num_sec',
    filterOptions: {
      placeholder: 'All',
      enabled: true,
      filterDropdownItems: departments()
    }
  },
  { label: 'Gereqs', 
    field: 'gereqs',
    filterOptions: {
      placeholder: 'Any',
      enabled: true,
      filterDropdownItems: ges()
    }
  },
  {
    label: 'Days', 
    field: 'days',
    filterOptions: {
      placeHolder: 'All',
      enabled: true,
    }
  },
  { label: 'Times', 
    field: 'times',
    filterOptions: {
      placeHolder: 'All',
      enabled: true,
    }
  },
  { label: 'Prof', 
    field: 'prof',
    hidden: true,
    filterOptions: {
      placeHolder: 'All',
      enabled: true,
    }
  },
  { label: 'Rating', 
    field: 'rating',
    hidden: false,
    filterOptions: {
      placeHolder: 'All',
      enabled: true,
    },
    type: 'number'
  },
  { label: 'Difficulty', 
    field: 'difficulty',
    hidden: false,
    filterOptions: {
      placeHolder: 'All',
      enabled: true,
    },
    type: 'number'
  },
  { label: 'Reviews', 
    field: 'reviews',
    hidden: false,
    filterOptions: {
      placeHolder: 'All',
      enabled: true,
    },
    type: 'number'
  },
  { label: 'Prereqs', 
    field: 'has_prereqs',
    filterOptions: {
      placeHolder: 'All',
      enabled: true,
    }
  },
  { label: 'Actions', 
    field: 'actions',
    filterOptions: {
      placeHolder: 'All',
      enabled: true,
    }
  },
]