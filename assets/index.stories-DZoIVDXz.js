import{j as n}from"./jsx-runtime-BVoke63R.js";import{R as a}from"./iframe-m4v2SYte.js";import{S as d,a as x,b as p}from"./index-ConfhCac.js";import{g as u}from"./index-KUF0lZ3c.js";import"./preload-helper-PPVm8Dsz.js";const{action:g}=__STORYBOOK_MODULE_ACTIONS__,E={title:"react-easy-sort/Axis lock",parameters:{componentSubtitle:"SortableList"},argTypes:{count:{name:"Number of elements",control:{type:"range",min:3,max:12,step:1}},lockAxis:{options:["x","y"],control:{type:"inline-radio"}}},args:{count:6,lockAxis:"x"}},t=({count:s,lockAxis:i})=>{const[m,r]=a.useState([]);a.useEffect(()=>{r(u(s))},[s]);const c=(e,o)=>{g("onSortEnd")(`oldIndex=${e}, newIndex=${o}`),r(l=>p(l,e,o))};return n.jsx(d,{onSortEnd:c,className:"font-sans select-none grid grid-cols-3 gap-4 sm:gap-6",draggedItemClassName:"bg-blue-800",lockAxis:i,children:m.map(e=>n.jsx(x,{children:n.jsx("div",{className:"flex justify-center items-center bg-blue-600 text-white h-[150px] cursor-grab text-xl select-none",children:e})},e))})};t.__docgenInfo={description:"",methods:[],displayName:"Demo",props:{count:{required:!0,tsType:{name:"number"},description:""},lockAxis:{required:!0,tsType:{name:"union",raw:"'x' | 'y'",elements:[{name:"literal",value:"'x'"},{name:"literal",value:"'y'"}]},description:""}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`({
  count,
  lockAxis
}: StoryProps) => {
  const [items, setItems] = React.useState<string[]>([]);
  React.useEffect(() => {
    setItems(generateItems(count));
  }, [count]);
  const onSortEnd = (oldIndex: number, newIndex: number) => {
    action('onSortEnd')(\`oldIndex=\${oldIndex}, newIndex=\${newIndex}\`);
    setItems(array => arrayMove(array, oldIndex, newIndex));
  };
  return <SortableList onSortEnd={onSortEnd} className="font-sans select-none grid grid-cols-3 gap-4 sm:gap-6" draggedItemClassName="bg-blue-800" lockAxis={lockAxis}>
      {items.map(item => <SortableItem key={item}>
          <div className="flex justify-center items-center bg-blue-600 text-white h-[150px] cursor-grab text-xl select-none">
            {item}
          </div>
        </SortableItem>)}
    </SortableList>;
}`,...t.parameters?.docs?.source}}};const _=["Demo"];export{t as Demo,_ as __namedExportsOrder,E as default};
