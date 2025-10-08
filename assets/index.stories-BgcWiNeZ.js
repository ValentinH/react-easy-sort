import{j as n}from"./jsx-runtime-BVoke63R.js";import{R as l}from"./iframe-m4v2SYte.js";import{S as d,a as u,b as p}from"./index-ConfhCac.js";import{g}from"./index-KUF0lZ3c.js";import"./preload-helper-PPVm8Dsz.js";const{action:S}=__STORYBOOK_MODULE_ACTIONS__,E={title:"react-easy-sort/Simple grid",parameters:{componentSubtitle:"SortableList"},argTypes:{count:{name:"Number of elements",control:{type:"range",min:3,max:120,step:1}},autoScroll:{name:"Auto scroll",control:{type:"boolean"}}},args:{count:12,autoScroll:!1}},t=({count:o,autoScroll:m})=>{const[r,s]=l.useState([]);l.useEffect(()=>{s(g(o))},[o]),console.log(r,o);const c=(e,a)=>{S("onSortEnd")(`oldIndex=${e}, newIndex=${a}`),s(i=>p(i,e,a))};return n.jsx(d,{onSortEnd:c,className:"font-sans select-none grid grid-cols-3 gap-4 sm:gap-6",draggedItemClassName:"bg-blue-800",autoScroll:m,children:r.map(e=>n.jsx(u,{children:n.jsx("div",{className:"flex justify-center items-center bg-blue-600 text-white h-[150px] cursor-grab text-xl select-none",children:e})},e))})};t.__docgenInfo={description:"",methods:[],displayName:"Demo",props:{count:{required:!0,tsType:{name:"number"},description:""},autoScroll:{required:!0,tsType:{name:"boolean"},description:""}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`({
  count,
  autoScroll
}: StoryProps) => {
  const [items, setItems] = React.useState<string[]>([]);
  React.useEffect(() => {
    setItems(generateItems(count));
  }, [count]);
  console.log(items, count);
  const onSortEnd = (oldIndex: number, newIndex: number) => {
    action('onSortEnd')(\`oldIndex=\${oldIndex}, newIndex=\${newIndex}\`);
    setItems(array => arrayMove(array, oldIndex, newIndex));
  };
  return <SortableList onSortEnd={onSortEnd} className="font-sans select-none grid grid-cols-3 gap-4 sm:gap-6" draggedItemClassName="bg-blue-800" autoScroll={autoScroll}>
      {items.map(item => <SortableItem key={item}>
          <div className="flex justify-center items-center bg-blue-600 text-white h-[150px] cursor-grab text-xl select-none">
            {item}
          </div>
        </SortableItem>)}
    </SortableList>;
}`,...t.parameters?.docs?.source}}};const _=["Demo"];export{t as Demo,_ as __namedExportsOrder,E as default};
