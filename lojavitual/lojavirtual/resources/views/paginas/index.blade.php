@if (count($produtos) > 0)
    @foreach ($produtos as $produto)
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-10">
              <h4>{{$produto->nome}}</h4>
            </div>
          </div>
          <p>{{$produto->descricao}}</p>
          <p>{{$produto->preço}}</p>
          <p>{{$produto->quantidade}}</p>
          <hr>
        </div>
      </div>
    @endforeach
  @else
    <p>Não existem produtos!</p>
  @endif