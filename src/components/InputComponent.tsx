interface InputComponent extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  classNameLabel?: string
  orientacoes?: string
  segundaOrientacao?: string
}

export function InputComponent({ label, classNameLabel, orientacoes, segundaOrientacao, ...rest }: InputComponent) {
  return (
    <div className="my-4">
      <label htmlFor={rest.id} className={`font-semibold ${classNameLabel}`}>{label}</label>
      <p className="orientacoes mb-2" >{orientacoes}</p>
      <p className="orientacoes">{segundaOrientacao}</p>
      <input id={rest.id} className='border rounded-sm p-2 w-full' {...rest} />
    </div>
  )
}