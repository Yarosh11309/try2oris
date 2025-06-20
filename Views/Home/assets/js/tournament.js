(function(){
    async function load(){
        const r = await fetch('/api/tournaments');
        return await r.json();
    }
    async function render(){
        const list = await load();
        const c = $('#tournamentList').empty();
        list.forEach(t=>{
            c.append(`
<div class="col-lg-6 fade-slide bottom mb-4">
    <div class="single-tournament-2 tournament-card" data-link="${t.liveUrl}">
        <img class="bg-img" src="assets/img/tournament/bg-3.png" alt="img">
        <div class="content-area">
            <div class="top-area d-flex align-items-center align-self-center">
                <img class="me-3 main-img" src="${t.imageUrl}" alt="img">
                <div class="details">
                    <h6>Action</h6>
                    <h4 class="mb-0">${t.name}</h4>
                </div>
                ${auth.isAdmin()?`<button class='btn btn-danger btn-sm ms-auto' data-id='${t.id}'>Удалить</button>`:''}
            </div>
            <span class="line-shadow"></span>
            <div class="bottom-area">
                <div class="row align-items-center">
                    <div class="col-6">
                        <span>PRIZE</span><br>
                        <span class="color-base">${t.prize}</span>
                    </div>
                    <div class="col-6 text-end">
                        ${t.liveUrl?`<a class='btn btn-gray btn-sm' href='${t.liveUrl}' target='_blank' rel='noopener noreferrer'>live</a>`:''}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`);
        });
    }
    $(document).on('submit','.addTournamentForm',async function(e){
        e.preventDefault();
        const form=$(this);
        await fetch('/api/tournaments',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                name:form.find('#tourName').val(),
                prize:form.find('#tourPrize').val(),
                imageUrl:form.find('#tourImage').val(),
                liveUrl:form.find('#tourLink').val()
            })
        });
        render();
        this.reset();
    });
    $(document).on('click','#tournamentList .btn-danger',async function(){
        const id=$(this).data('id');
        await fetch('/api/tournaments/'+id,{method:'DELETE'});
        render();
    });
    $(document).on('click','.tournament-card',function(e){
        if($(e.target).closest('button,a').length) return;
        const link=$(this).data('link');
        if(link) window.open(link,'_blank');
    });
    $(function(){
        if(auth.isAdmin()) $('.addTournamentForm').show();
        render();
    });
})();
