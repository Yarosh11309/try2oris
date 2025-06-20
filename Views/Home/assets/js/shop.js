(function(){
    async function load(){
        const r = await fetch('/api/products');
        return await r.json();
    }
    async function render(){
        const list = await load();
        const container = $('#productList').empty();
        list.forEach(p=>{
            const item = $(
`<div class="col-lg-4 col-md-6 product-item mb-4">
    <div class="single-product-inner text-center">
        <div class="thumb">
            <a href="${p.imageUrl}" target="_blank"><img src="${p.imageUrl}" alt="img"></a>
        </div>
        <div class="details">
            <h4 class="title">${p.name}</h4>
            <h6 class="amount">${p.price}</h6>
            ${auth.isAdmin()?`<button class='btn btn-sm btn-danger' data-id='${p.id}'>Удалить</button>`:''}
        </div>
    </div>
</div>`);
            container.append(item);
        });
        updateFilter(list);
    }
    function updateFilter(list){
        const select = $('.filter-inner-btn select');
        if(!select.length) return;
        select.empty();
        select.append('<option value="all">Все</option>');
        [...new Set(list.map(p=>p.name))].forEach(n=>{
            select.append(`<option value="${n}">${n}</option>`);
        });
    }
    $(document).on('submit','#addProductForm',async function(e){
        e.preventDefault();
        await fetch('/api/products',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({name:$('#productName').val(),price:$('#productPrice').val(),imageUrl:$('#productImage').val()})
        });
        render();
        this.reset();
    });
    $(document).on('click','.btn-danger',async function(){
        const id=$(this).data('id');
        await fetch('/api/products/'+id,{method:'DELETE'});
        render();
    });
    $(render);
})();
