import{j as t}from"./jsx-runtime-BVoke63R.js";import{R as a}from"./iframe-m4v2SYte.js";import{S as d,a as l,c as b,b as x}from"./index-ConfhCac.js";import{g as p}from"./index-KUF0lZ3c.js";import"./preload-helper-PPVm8Dsz.js";const{action:u}=__STORYBOOK_MODULE_ACTIONS__,y={title:"react-easy-sort/With knobs",parameters:{componentSubtitle:"SortableList"},argTypes:{count:{name:"Number of elements",control:{type:"range",min:3,max:12,step:1}}},args:{count:3}},n=({count:s})=>{const[m,r]=a.useState([]);a.useEffect(()=>{r(p(s))},[s]);const i=(e,o)=>{u("onSortEnd")(`oldIndex=${e}, newIndex=${o}`),r(c=>x(c,e,o))};return t.jsx(d,{onSortEnd:i,className:"font-sans select-none",draggedItemClassName:"bg-blue-800",children:m.map(e=>t.jsx(l,{children:t.jsxs("div",{className:"shrink-0 flex justify-between items-center bg-blue-600 text-white m-2 w-[150px] h-[34px] px-2",children:[t.jsx(b,{children:t.jsx("div",{className:"py-[0.15rem] px-2 text-blue-600 text-[0.8em] bg-white mr-2 rounded cursor-grab",children:"DRAG"})}),e]})},e))})};n.__docgenInfo={description:"",methods:[],displayName:"Demo"};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`({
  count
}) => {
  const [items, setItems] = React.useState<string[]>([]);
  React.useEffect(() => {
    setItems(generateItems(count));
  }, [count]);
  const onSortEnd = (oldIndex: number, newIndex: number) => {
    action('onSortEnd')(\`oldIndex=\${oldIndex}, newIndex=\${newIndex}\`);
    setItems(array => arrayMove(array, oldIndex, newIndex));
  };
  return <SortableList onSortEnd={onSortEnd} className="font-sans select-none" draggedItemClassName="bg-blue-800">
      {items.map(item => <SortableItem key={item}>
          <div className="shrink-0 flex justify-between items-center bg-blue-600 text-white m-2 w-[150px] h-[34px] px-2">
            <SortableKnob>
              <div className="py-[0.15rem] px-2 text-blue-600 text-[0.8em] bg-white mr-2 rounded cursor-grab">
                DRAG
              </div>
            </SortableKnob>
            {item}
          </div>
        </SortableItem>)}
    </SortableList>;
}`,...n.parameters?.docs?.source}}};const w=["Demo"];export{n as Demo,w as __namedExportsOrder,y as default};
