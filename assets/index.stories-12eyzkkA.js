import{j as t}from"./jsx-runtime-BVoke63R.js";import{R as a}from"./iframe-m4v2SYte.js";import{S as i,a as l,b as p}from"./index-ConfhCac.js";import{g as u}from"./index-KUF0lZ3c.js";import"./preload-helper-PPVm8Dsz.js";const{action:x}=__STORYBOOK_MODULE_ACTIONS__,h={title:"react-easy-sort/With drop target",parameters:{componentSubtitle:"SortableList"},argTypes:{count:{name:"Number of elements",control:{type:"range",min:3,max:12,step:1}}},args:{count:3}},r=({count:s})=>{const[m,n]=a.useState([]);a.useEffect(()=>{n(u(s))},[s]);const c=(e,o)=>{x("onSortEnd")(`oldIndex=${e}, newIndex=${o}`),n(d=>p(d,e,o))};return t.jsx(i,{onSortEnd:c,className:"font-sans select-none grid grid-cols-3 gap-4 sm:gap-6",draggedItemClassName:"bg-blue-800",dropTarget:t.jsx(g,{}),children:m.map(e=>t.jsx(l,{children:t.jsx("div",{className:"flex justify-center items-center bg-blue-600 text-white h-[150px] cursor-grab text-xl select-none",children:e})},e))})},g=()=>t.jsx("div",{className:"border-2 border-dashed border-blue-600 h-[150px] box-border text-xl flex justify-center items-center text-blue-600",children:"Drop Target"});r.__docgenInfo={description:"",methods:[],displayName:"Demo",props:{count:{required:!0,tsType:{name:"number"},description:""}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`({
  count
}: StoryProps) => {
  const [items, setItems] = React.useState<string[]>([]);
  React.useEffect(() => {
    setItems(generateItems(count));
  }, [count]);
  const onSortEnd = (oldIndex: number, newIndex: number) => {
    action('onSortEnd')(\`oldIndex=\${oldIndex}, newIndex=\${newIndex}\`);
    setItems(array => arrayMove(array, oldIndex, newIndex));
  };
  return <SortableList onSortEnd={onSortEnd} className="font-sans select-none grid grid-cols-3 gap-4 sm:gap-6" draggedItemClassName="bg-blue-800" dropTarget={<DropTarget />}>
      {items.map(item => <SortableItem key={item}>
          <div className="flex justify-center items-center bg-blue-600 text-white h-[150px] cursor-grab text-xl select-none">
            {item}
          </div>
        </SortableItem>)}
    </SortableList>;
}`,...r.parameters?.docs?.source}}};const E=["Demo"];export{r as Demo,E as __namedExportsOrder,h as default};
