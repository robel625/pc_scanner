import React , { useState, useEffect } from "react";
import { Header, Button2, Add_Staff } from '../components';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';
import avatar from '../data/avatar.jpg';
import avatar2 from '../data/avatar2.jpg';
import avatar3 from '../data/avatar3.png';
import avatar4 from '../data/avatar4.jpg';
import { GrView } from 'react-icons/gr';
import { MdOutlineDeleteForever } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { useStateContext } from '../contexts/ContextProvider';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getPosts, deletePost } from '../redux/actions/postAction';
import { filterPosts } from '../redux/actions/postAction';



const Staffs = () => {
  // const [open, setOpen] = useState(false);
  const { currentColor, currentMode, handleClick, isClicked } = useStateContext();
  const toolbarOptions = ['Search'];

  const editing = { allowDeleting: true, allowEditing: true };

  

  const { auth, homePosts } = useSelector((state) => state);
  const dispatch = useDispatch();

  
  
  const [query, setQuery] = useState('')

  console.log("query", query)

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    // if (auth.token && homePosts?.posts?.length == '') {
    //   dispatch(getPosts(page, pageSize,auth.token));
    // }
    dispatch(getPosts(page, pageSize,auth.token));
  }, [dispatch, auth.token, page, pageSize]);

  function handleSearch() {
    dispatch(filterPosts(query ,auth.token))
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className='md:flex  justify-between'>
        <div className='flex gap-10'>
        <Header category="Page" title="Staffs" />
        <div className="mt-3">
              <Button2
                color="white"
                bgColor={currentColor}
                text="Add Staff"
                borderRadius="10px"
                customFunc={() => handleClick('add_Staff')}
              />
        </div>
        </div>
        <div
				style={{
					padding: 16,
					borderBottomWidth: 1,
					borderColor: '#f0f0f0'
				}}
			>
				<div style={{ position: 'relative' }}>
					<input
						style={{
							backgroundColor: '#e1e2e4',
							height: 42,
							borderRadius: 26,
							padding: 16,
							fontSize: 16,
							paddingLeft: 50,
						}}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
						placeholder='Search...'
						// placeholderTextColor='#b0b0b0'
					/>
					<IoMdSearch style={{fontSize: '25px', color: '#505050', position: 'absolute',left: 18, top: 10 }}/>
					</div>
			</div>
      </div>
      <GridComponent
        dataSource={homePosts.posts}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {employeesGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />

      </GridComponent>

      {isClicked.add_Staff && (<Add_Staff />)}
    </div>
  )
}

export default Staffs


const employeesData = [
  {
    id: '1',
    Name: "Robel Gulima",
    Gender: "M",
    Phone: "0987654321",
    Email: "name@gmail.com",
    EEU_Id: "579339",
    Job_Title: "Software Developer",
    Department: "IT",
    EmployeeImage:
    avatar3,
  },
  {
    id: '2',
    Name: "Emily Nguyen",
    Gender: "F",
    Phone: "0987654321",
    Email: "name@gmail.com",
    EEU_Id: "579340",
    Job_Title: "Product Manager",
    Department: "Marketing",
    EmployeeImage:
      avatar4,
  },
  {
    id: '3',
    Name: "Jonathan Lee",
    Gender: "M",
    Phone: "0987654321",
    Email: "name@gmail.com",
    EEU_Id: "579341",
    Job_Title: "Data Scientist",
    Department: "Analytics",
    EmployeeImage:
      avatar2,
  },
  {
    id: '4',
    Name: "Anna Smith",
    Gender: "F",
    Phone: "0987654321",
    Email: "name@gmail.com",
    EEU_Id: "579342",
    Job_Title: "Graphic Designer",
    Department: "Design",
    EmployeeImage:
      avatar,
  },
  {
    id: '5',
    Name: "Michael Brown",
    Gender: "M",
    Phone: "0987654321",
    Email: "name@gmail.com",
    EEU_Id: "579343",
    Job_Title: "HR Manager",
    Department: "Human Resources",
    EmployeeImage:
      avatar2,
  },
  {
    id: '6',
    Name: "Sophia Chen",
    Gender: "F",
    Phone: "0987654321",
    Email: "name@gmail.com",
    EEU_Id: "579344",
    Job_Title: "Marketing Analyst",
    Department: "Marketing",
    EmployeeImage:
    avatar3,
  },
  {
    id: '7',
    Name: "Daniel Kim",
    Gender: "M",
    Phone: "0987654321",
    Email: "name@gmail.com",
    EEU_Id: "579345",
    Job_Title: "Accountant",
    Department: "Finance",
    EmployeeImage:
      avatar4,
  },
  {
    id: '8',
    Name: "Olivia Patel",
    Gender: "F",
    Phone: "0987654321",
    Email: "name@gmail.com",
    EEU_Id: "579346",
    Job_Title: "Software Engineer",
    Department: "IT",
    EmployeeImage:
      avatar3,
  },
  {
    id: '9',
    Name: "Carlos Gonzales",
    Gender: "M",
    Phone: "0987654321",
    Email: "name@gmail.com",
    EEU_Id: "579347",
    Job_Title: "Operations Manager",
    Department: "Operations",
    EmployeeImage:
      avatar4,
  },
  {
    id: '10',
    Name: "Isabella Wang",
    Gender: "F",
    Phone: "0987654321",
    Email: "name@gmail.com",
    EEU_Id: "579348",
    Job_Title: "UX/UI Designer",
    Department: "Design",
    EmployeeImage:
      avatar3,
  }
,
 {
   id: '11',
   Name: 'Emma Smith',
   Gender: 'F',
   Phone: "0987654321",
   Email: "name@gmail.com",
   EEU_Id: '579340',
   Job_Title: 'Project Manager',
   Department: 'IT',
   EmployeeImage:
    avatar3,
 },
 {
   id: '12',
   Name: 'John Doe',
   Gender: 'M',
   Phone: "0987654321",
   Email: "name@gmail.com",
   EEU_Id: '579348',
   Job_Title: 'Data Analyst',
   Department: 'Analytics',
   EmployeeImage:
      avatar4,
 },
 {
  id: '13',
  Name: 'John Doe',
  Gender: 'M',
  Phone: "0987654321",
  Email: "name@gmail.com",
  EEU_Id: '579348',
  Job_Title: 'Data Analyst',
  Department: 'Analytics',
  EmployeeImage:
     avatar4,
},]


//   const gridEmployeeAction = (props) => (

//     const { auth, homePosts } = useSelector((state) => state);
//     const dispatch = useDispatch();

//     <div className="flex items-center justify-center gap-2">
//       <Link to={`/staff/${props.id}`}>
//         <GrView style={{ fontSize: '20px', color: 'green' }}/>
//       </Link>

//       <div onClick={() => {
//   if (window.confirm(`Are you sure you want to delete ${props.first_name}?`)) {
//     dispatch(deletePost( props.id, auth ));
//   }
// }}>
//   <MdOutlineDeleteForever style={{ fontSize: '25px', color: 'red' }} />
// </div>

//     </div>
    
//   );

const GridEmployeeAction = (props) => {
  // Access state and dispatch outside the component's JSX
  const { auth, homePosts } = useSelector((state) => state);
  const dispatch = useDispatch();

  let id = props.id

  return (
    <div className="flex items-center justify-center gap-2">
      <Link to={`/staff/${props.id}`}>
        <GrView style={{ fontSize: '20px', color: 'green' }} />
      </Link>

      <div onClick={() => {
        if (window.confirm(`Are you sure you want to delete ${props.first_name}?`)) {
           dispatch(deletePost({id, auth})); // Pass props.id and auth directly
           console.log("ID AC",id)
        }
      }}>
        <MdOutlineDeleteForever style={{ fontSize: '25px', color: 'red' }} />
      </div>
    </div>
  );
};

 

  const gridEmployeeProfile = (props) => (
    <div className="flex items-center gap-2">
      <img
        className="rounded-full w-10 h-10"
        src={props.thumbnail}
        // alt="employee"
      />
      <p> {props.first_name || ''} {props.last_name || ''}</p>
    </div>
  );


export const employeesGrid = [
    { headerText: 'Employee',
      width: '150',
      template: gridEmployeeProfile,
      textAlign: 'Center' },
    { field: 'Name',
      headerText: '',
      width: '0',
      textAlign: 'Center',
    },
    { field: 'eeu_id',
      headerText: 'eeu_id',
      width: '80',
      textAlign: 'Center',
    },
  
    { field: 'gender',
      headerText: 'Gender',
      width: '100',
      textAlign: 'Center' 
    },
    { field: 'mobile',
      headerText: 'Phone',
      width: '135',
      textAlign: 'Center' 
    },
    { field: 'email',
      headerText: 'Email',
      width: '135',
      textAlign: 'Center' 
    },
  
    { field: 'department',
      headerText: 'Department',
      width: '120',
      textAlign: 'Center' },
    { field: 'job_title',
      headerText: 'Job_Title',
      width: '125',
      textAlign: 'Center' },
    { headerText: 'Action',
      width: '150',
      template: GridEmployeeAction,
      textAlign: 'Center' },
    
  ];

  