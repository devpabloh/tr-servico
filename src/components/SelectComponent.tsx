

interface SelectComponentProps extends React.SelectHTMLAttributes<HTMLSelectElement>{
  label: string
  orientacoes?: string;
}

export function SelectComponent({label, children, orientacoes, ...rest}: SelectComponentProps){
  return (
    <div className="flex flex-col my-4">
      {label && <label htmlFor={rest.id} className="font-semibold">{label}</label>}
      {orientacoes && <span className="orientacoes">{orientacoes}</span>}
      <select {...rest} className="border rounded-sm p-2 flex-grow w-1/5">
        {children}
      </select>
    </div>
  )
}