import{j as n}from"./jsx-runtime-BVoke63R.js";import{R as a}from"./iframe-m4v2SYte.js";import{S as d,a as u,b as p}from"./index-ConfhCac.js";import{g as S}from"./index-KUF0lZ3c.js";import"./preload-helper-PPVm8Dsz.js";const{action:b}=__STORYBOOK_MODULE_ACTIONS__,E={title:"react-easy-sort/Simple vertical list",parameters:{componentSubtitle:"SortableList"},argTypes:{count:{name:"Number of elements",control:{type:"range",min:3,max:120,step:1}},autoScroll:{name:"Auto scroll",control:{type:"boolean"}}},args:{count:30,autoScroll:!1}},t=({count:r,autoScroll:m})=>{const[c,o]=a.useState([]);a.useEffect(()=>{o(S(r))},[r]);const l=(e,s)=>{b("onSortEnd")(`oldIndex=${e}, newIndex=${s}`),o(i=>p(i,e,s))};return n.jsx(d,{onSortEnd:l,className:"font-sans select-none",draggedItemClassName:"bg-blue-800",autoScroll:m,children:c.map(e=>n.jsx(u,{children:n.jsx("div",{className:"shrink-0 flex justify-center items-center bg-blue-600 text-white m-2 w-[150px] h-[34px] cursor-grab",children:e})},e))})};t.__docgenInfo={description:"",methods:[],displayName:"Demo",props:{count:{required:!0,tsType:{name:"number"},description:""},autoScroll:{required:!0,tsType:{name:"boolean"},description:""}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`({
  count,
  autoScroll
}: StoryProps) => {
  const [items, setItems] = React.useState<string[]>([]);
  React.useEffect(() => {
    setItems(generateItems(count));
  }, [count]);
  const onSortEnd = (oldIndex: number, newIndex: number) => {
    action('onSortEnd')(\`oldIndex=\${oldIndex}, newIndex=\${newIndex}\`);
    setItems(array => arrayMove(array, oldIndex, newIndex));
  };
  return <SortableList onSortEnd={onSortEnd} className="font-sans select-none" draggedItemClassName="bg-blue-800" autoScroll={autoScroll}>
      {items.map(item => <SortableItem key={item}>
          <div className="shrink-0 flex justify-center items-center bg-blue-600 text-white m-2 w-[150px] h-[34px] cursor-grab">
            {item}
          </div>
        </SortableItem>)}
    </SortableList>;
}`,...t.parameters?.docs?.source}}};const _=["Demo"];export{t as Demo,_ as __namedExportsOrder,E as default};
