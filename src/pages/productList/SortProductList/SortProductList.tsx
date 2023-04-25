const SortProductList = () => {
  return (
    <div className='bg-gray-300/40 px-3 py-4'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>Sắp xếp theo</div>
          <button className='h-8 bg-orange px-4 text-center capitalize text-white hover:bg-orange/80'>Phổ biến</button>
          <button className='h-8 bg-white px-4 text-center capitalize text-black hover:bg-slate-100'>Mới nhất</button>
          <button className='h-8 bg-white px-4 text-center capitalize text-black hover:bg-slate-100'>Bán chạy</button>
          <select
            className='h-8 bg-white px-4 text-left text-sm capitalize text-black hover:bg-slate-200'
            defaultValue={''}
          >
            <option value='' disabled>
              Giá
            </option>
            <option value='price:asc'>Giá: Thấp đến cao</option>
            <option value='price:desc'>Giá: Cao đến thấp</option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>1</span>
            <span>/2</span>
          </div>
          <div className='ml-2 flex gap-2'>
            <button className='rounded-bt-sm h-8 cursor-not-allowed rounded-tl-sm bg-white/60 px-3 shadow-sm hover:bg-slate-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-6 w-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75' />
              </svg>
            </button>
            <button className='rounded-bt-sm h-8  rounded-tl-sm bg-white/60 px-3 shadow-sm hover:bg-slate-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-6 w-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortProductList
