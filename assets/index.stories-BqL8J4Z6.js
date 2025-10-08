import{j as e}from"./jsx-runtime-BVoke63R.js";import{R as m}from"./iframe-m4v2SYte.js";import{S as d,a as c,b as p}from"./index-ConfhCac.js";import"./preload-helper-PPVm8Dsz.js";const x={title:"react-easy-sort/Interactive avatars",parameters:{componentSubtitle:"SortableList"},argTypes:{count:{name:"Number of elements",control:{type:"range",min:3,max:12,step:1},defaultValue:8}}},t=({count:n})=>{const[s,r]=m.useState([{name:"Alpha",image:"https://placedog.net/300?id=1"},{name:"Bravo",image:"https://placedog.net/300?id=2"},{name:"Charlie",image:"https://placedog.net/300?id=3"},{name:"Delta",image:"https://placedog.net/300?id=4"},{name:"Echo",image:"https://placedog.net/300?id=5"},{name:"Foxtrot",image:"https://placedog.net/300?id=6"},{name:"Golf",image:"https://placedog.net/300?id=7"},{name:"Hotel",image:"https://placedog.net/300?id=8"},{name:"India",image:"https://placedog.net/300?id=9"},{name:"Kilo",image:"https://placedog.net/300?id=10"},{name:"Lima",image:"https://placedog.net/300?id=11"}]),l=(a,o)=>{r(i=>p(i,a,o))};return e.jsx(d,{onSortEnd:l,className:"flex flex-wrap select-none",draggedItemClassName:"shadow-2xl [&_button]:opacity-0",children:s.slice(0,n).map(({name:a,image:o})=>e.jsx(c,{children:e.jsxs("div",{className:"relative shrink-0 flex m-2 cursor-grab select-none rounded-full",children:[e.jsx("img",{className:"w-[150px] h-[150px] pointer-events-none rounded-full object-cover",alt:a,src:o,draggable:!1}),e.jsx("button",{className:"cursor-pointer absolute bottom-0 right-0 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-700","aria-label":"like",onClick:()=>alert("Woof!"),children:"❤️"})]})},a))})};t.__docgenInfo={description:"",methods:[],displayName:"Demo",props:{count:{required:!0,tsType:{name:"number"},description:""}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`({
  count
}: StoryProps) => {
  const [items, setItems] = React.useState([{
    name: 'Alpha',
    image: 'https://placedog.net/300?id=1'
  }, {
    name: 'Bravo',
    image: 'https://placedog.net/300?id=2'
  }, {
    name: 'Charlie',
    image: 'https://placedog.net/300?id=3'
  }, {
    name: 'Delta',
    image: 'https://placedog.net/300?id=4'
  }, {
    name: 'Echo',
    image: 'https://placedog.net/300?id=5'
  }, {
    name: 'Foxtrot',
    image: 'https://placedog.net/300?id=6'
  }, {
    name: 'Golf',
    image: 'https://placedog.net/300?id=7'
  }, {
    name: 'Hotel',
    image: 'https://placedog.net/300?id=8'
  }, {
    name: 'India',
    image: 'https://placedog.net/300?id=9'
  }, {
    name: 'Kilo',
    image: 'https://placedog.net/300?id=10'
  }, {
    name: 'Lima',
    image: 'https://placedog.net/300?id=11'
  }]);
  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setItems(array => arrayMove(array, oldIndex, newIndex));
  };
  return <SortableList onSortEnd={onSortEnd} className="flex flex-wrap select-none" draggedItemClassName="shadow-2xl [&_button]:opacity-0">
      {items.slice(0, count).map(({
      name,
      image
    }) => <SortableItem key={name}>
          <div className="relative shrink-0 flex m-2 cursor-grab select-none rounded-full">
            <img className="w-[150px] h-[150px] pointer-events-none rounded-full object-cover" alt={name} src={image} draggable={false} />
            <button className="cursor-pointer absolute bottom-0 right-0 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-700" aria-label="like" onClick={() => alert('Woof!')}>
              ❤️
            </button>
          </div>
        </SortableItem>)}
    </SortableList>;
}`,...t.parameters?.docs?.source}}};const f=["Demo"];export{t as Demo,f as __namedExportsOrder,x as default};
