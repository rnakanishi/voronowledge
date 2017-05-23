---
layout: right-sidebar
title:  Métodos de interpolação
tags: [interpolation, pt-br]
summary: (pt-BR) Lagrange, Hermite and Spline interpolation methods.
author: RNakanishi
date: 2017-05-25
sidebar: |
  # Conteúdo
  ## [Polinômios de Lagrange](#polinômios-de-lagrange)
  ## [Interpolação de Hermite](#interpolação-de-hermite)
  ### [Diferenças divididas](#diferenças-divididas)
  ### [Polinômios de Newton](#polinômios-de-newton)
  ### [Interpolação com derivadas](#interpolação-com-derivadas)
  ## [Interpolação por partes](#interpolação-por-partes)
  ### [Splines](#splines)
  ### [Splines cúbicas](#splines-cúbicas)
---

Interpolações são métodos utilizados quando se deseja saber o valor desconhecido dentro de um intervalo dado por uma amostra. Como, muitas vezes, não é possível saber qual a função que gera os pontos, utiliza-se de métodos numéricos para se estimá-la. Dessa forma, podemos estimar o comportamento dos demais pontos dentro do intervalo.

<figure class="graph-full"> </figure>

{: .graph.caption}
A partir dos pontos amostrados, queremos saber o comportamento de uma possível função que passa por tais pontos.

É possível encontrar vários métodos de interpolação. Em nosso escopo, trataremos dos métodos pioneiros que interpolam a função utilizando todos os pontos dados (*interpolação de Lagrange*) e métodos que também conseguem utilizar informação de derivada, quando presente (*interpolação de Hermite*) Entretanto, como veremos mais a frente, seu principal problema é que o grau do polinômio gerado cresce com o número de amostras. E isso motiva o uso de métodos que interpolam com menos pontos, mas que conseguem apresentar bons resultados (*Splines lineares* e *cúbicas*).

## Polinômios de Lagrange

{: .theorem.pt-br}
> Sejam $$x_0, x_1, ..., x_n$$, $$n+1$$ pontos distintos e $$f$$ o valor da função nesses pontos. Então existe apenas um polinômio $$P(x)$$ de grau $$n$$ tal que \$$P(x_k) = f(x_k)\quad\text{para } k = 0,1,...,n.\$$
Esse polinômio é dado por \$$ P(x) = \sum_{k=0}^n f(x_k)L_k(x) \$$
em que, para cada $$k = 0, 1, ..., n$$, \$$ L_k(x) = \frac{\prod_{i=0, i\neq k}^n (x-x_i)}{\prod_{i=0, i\neq k}^n(x_k-x_i)}. \$$

Como pode-se observar, a construção de um polinômio é capaz de aproximar bem a curva desejada. Entretanto, caso a função original não seja polinomial, mas sim de outra natureza (trigonométrica, exponencial, etc), a interpolação gera um erro. É de interesse saber qual a grandeza desse erro para que as estimativas sejam o mais precisas possíveis. Para isso, estima-se um limitante superior para o erro:

{: .theorem.pt-br}
> Suponha $$x_0, x_1, ..., x_n$$ valores distintos dentro do intervalo $$[a,b]$$ e $$f \in C^{n+1}[a,b]$$. Então, para cada $$x$$ no intervalo, existe um valor $$\xi$$ desconhecido entre os valores $$x_0, x_1, ..., x_n$$ e dentro de $$(a,b)$$ tal que \$$ f(x) = P(x) + \frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)(x-x_1)\cdots(x-x_n),\$$ com $$P(x)$$ sendo o polinômio interpolador de Lagrange. O termo somado ao polinômio interpolador é o erro de interpolação do método.

### Implementação
O código implementado em `MatLab` é bem simples e envolve apenas o cálculo do polinômio $$L_k(x)$$:

{% highlight matlab linenos%}
L = ones(n,length(x)); % Polinomio de Lagrange

for k = 1:n
    div = ( x - xi ); % Dividendo do produtorio
    div(k) = [];

    den = ( xi(k) - xi ); % Denominador do produtorio
    den(k) = [];

    L(k) = prod(div) / prod(den);
end

y = yi * L; % Valor avaliado na interpolacao
{% endhighlight %}

No código acima, temos que `xi` são os pontos de interpolação; `yi` são os valores da função que se deseja interpolar, avaliado nos pontos `xi`; e `x` são os pontos que se deseja calcular, obtendo assim, os valores em `y`.

<!-- ### Exemplo gráfico
<figure class="lagrange"> </figure> -->

## Interpolação de Hermite
Para construção do polinômio de hermite, é necessário antes apresentar duas ferramentas: diferenças divididas e polinômios de Newton.

### Diferenças divididas

{: .definition.pt-br}
> Diferenças divididas são definidas recursivamente. Diferenças divididas de ordem-$$0$$: \$$f[x_i] = f(x_i),\quad i=0,1,\cdots,n\$$.
> Diferença dividida de ordem-$$1$$: \$$f[x_i, x_{i+1}] = \frac{f[x_{i+1}]-f[x_i]}{x_{i+1}-x_{i}} = \frac{f(x_{i+1})-f(x_i)}{x_{i+1}-x_{i}}\$$.
> Então, uma diferença dividida de ordem-$$k$$, entre $$x_i, x_{i+1}, \cdots, x_{i+k}$$, é definido como: \$$f[x_i, x_{i+1}, \cdots, x_{i+k}] = \frac{f[x_{i+1}, x_{i+2}, \cdots, x_{i+k}] - f[x_i, x_{i+1}, \cdots, x_{i+k-1}]}{x_{i+k}-x_i},\$$ com $$k = 1,\cdots,n$$ e $$ i = 0, 1,\cdots,n-k$$.

Uma forma mais simples de visualizar as diferenças divididas é montando uma tabela das diferenças:

{: .margin-first}
|$$x$$|ordem-$$0$$|ordem-$$1$$|ordem-$$2$$|ordem-$$3$$|$$\cdots$$|
|---|---|
|$$x_0$$|$$f[x_0]$$|$$f[x_0,x_1]$$|$$f[x_0,x_1,x_2]$$|$$f[x_0,x_1,x_2,x_3]$$
|$$x_1$$|$$f[x_1]$$|$$f[x_2,x_1]$$|$$f[x_1,x_2,x_3]$$|$$\vdots$$
|$$x_2$$|$$f[x_2]$$|$$f[x_3,x_2]$$|$$\vdots$$|$$\vdots$$|
|$$x_3$$|$$f[x_3]$$|$$\vdots$$|$$\vdots$$|$$\vdots$$|
|$$\vdots$$|$$\vdots$$|$$\vdots$$|$$\vdots$$|$$\vdots$$|


### Polinômios de Newton
O polinômio interpolador na forma de Newton é dada na seguinte forma: \$$P_n(x) = \alpha_0 + \alpha_1(x-x_0) + \cdots + \alpha_n(x-x_0)(x-x_1)\cdots(x-x_{n-1}).\$$
E cada coeficiente $$\alpha_k$$ é determinado utilizando diferenças divididas de ordem $$k$$:

{: .margin-first}
|$$x$$|ordem-$$0$$|ordem-$$1$$|ordem-$$2$$|$$\cdots$$|
|---|---|
|$$x_0$$|$$f[x_0] = \alpha_0$$|$$f[x_0,x_1] = \alpha_1$$|$$f[x_0,x_1,x_2] = \alpha_2$$|$$\cdots$$|

### Interpolação com derivadas

{: .theorem.pt-br}
> Seja uma função $$f \in C^n[a,b]$$ com derivadas contínuas. Dada as condições em cada nó $$x_i$$ como: \$$P_m^{(j)} = f^{(j)} = c_{ij}, \quad 0\leq j\leq k_i-1\quad\text{e } 0\leq i\leq n\$$ com $$m+1 = \kappa_0+\kappa_1+\cdots+\kappa_n$$, $$\kappa_i$$ sendo o número de condições em um nó $$x_i$$, ou seja, informações de derivada fornecidos.
> Então, existe um único polinômio $$P_m(x)$$ que satisfaz as condições de interpolação de Hermite.

Uma maneira de se obter os coeficientes do polinômio interpolador de Hermite é utilizando a tabela de diferenças divididas e o polinômio na forma de Newton.
Para montarmos a tabela de diferenças divididas, repetimos os pontos em que a derivada está presente. Nesse caso, temos que \$$f[x_k,x_k] = \lim_{h\to 0}\frac{f(x_k+h)-f(x_k)}{(x_k+h)-x_k} = f'(x_k).\$$ E no caso geral, \$$f[x_{k_1},\cdots,x_{k_m}] = \frac{1}{(m-1)!}f^{(m-1)}(x_k).\$$

Então, Dados $$n+1$$ pares de pontos e suas derivadas, queremos obter $$P_{2n+1}(x)$$ que satisfaz todas as condições dadas: \$$P_{2n+1}(x_i) = c_{i0},\quad P_{2n+1}'(x_i)=x_{i1},\quad i=0,\cdots,n.\$$

{: .margin-first}
|$$x$$|ordem-$$0$$|ordem-$$1$$|ordem-$$2$$|ordem-$$3$$|$$\cdots$$|
|---|---|
|$$x_0$$|$$f[x_0]=c_{00}$$|$$f[x_0,x_0]=c_{01}$$|$$f[x_0,x_0,x_1]$$|$$f[x_0,x_0,x_1,x_1]$$| $$\cdots$$|
|$$x_0$$|$$f[x_0]$$|$$f[x_0,x_1]$$|$$f[x_0,x_1,x_1]$$|$$f[x_0,x_1,x_1,x_2]$$|$$\cdots$$
|$$x_1$$|$$f[x_1]=c_{10}$$|$$f[x_1,x_1]=c_{11}$$|$$f[x_1,x_1,x_2]$$|$$f[x_1,x_1,x_2,x_2]$$|$$\cdots$$|
|$$x_1$$|$$f[x_1]$$|$$f[x_1,x_2]$$|$$f[x_1,x_2,x_2]$$|$$\vdots$$
|$$x_2$$|$$f[x_2]=c_{20}$$|$$f[x_2,x_2]=c_{21}$$|$$\vdots$$|$$\vdots$$|
|$$x_2$$|$$f[x_2]$$|$$\vdots$$|$$\vdots$$|$$\vdots$$|
|$$\vdots$$|$$\vdots$$|$$\vdots$$|$$\vdots$$|$$\vdots$$|

E finalmente, montamos o polinômio de Hermite: \$$P_{2n+1}(x) = \alpha_0 + \alpha_1(x-x_0) + \alpha_2(x-x_0)^2 + \alpha_3(x-x_0)^2(x-x_1) + \cdots\$$. Observe que os termos quadráticos aparecem por causa do maior número de informações presentes em cada ponto.

### Implementação
{% highlight matlab linenos %}
z = zeros(2*n,1);
Q = zeros(2*n);
N = ones(2*n,length(x));

z(1:2:2*n) = xi;
z(2:2:2*n) = xi;

% Matriz de Hermite
Q(1:2:2*n,1) = yi;
Q(2:2:2*n,1) = yi;
Q(2:2:2*n,2) = dyi;

Q(3:2:2*n,2) = ( Q(2:2:2*n-2,1) - Q(3:2:2*n,1) ) ./ ...
                ( z(2:2:2*n-2) - z(3:2:2*n) );

% Completando a matriz
for j=3:2*n
    for i=j:2*n
        Q(i,j) = (Q(i,j-1) - Q(i-1,j-1)) / ...
                    (z(i) - z(i-j+1));
    end
end

for i=2:2*n % forma de Newton
    for k = 1:i-1
        N(i,:) = N(i,:) .* (x-z(k));
    end
end
y = diag(Q)' * N;
{% endhighlight %}

No código em `MatLab` acima, é necessário algumas atenções:

1. O vetor `z` corresponde à primeira coluna da matriz de diferenças divididas, ou seja, $$x_0, x_0, x_1, x_1, \cdots, x_n, x_n$$ e ele será usado para construção do polinômio de Newton;
2. Ao construirmos a tabela de diferenças divididas, `Q`, temos que tomar cuidado com a indiciação utilizada;
3. Na nossa implementação, a matriz "desce", ao invés de "se manter no topo", como mostrado na teoria. Por isso que o polinômio de Newton é multiplicado pela diagonal de `Q`.

## Interpolação por partes
Os métodos apresentados anteriormente conseguem encontrar uma interpolação para os pontos dados utilizando apenas um polinômio. Entretanto, caso haja muitos pontos a serem interpolados, o grau do polinômio aumenta e isso pode criar efeitos oscilatórios indesejados (fenômeno de Runge).

<figure class="bad-poly"> </figure>

Uma alternativa para tentar contornar esse problema é criar polinômios interpoladores utilizando subintervalos. Para isso é necessário tomar o cuidado de manter o polinômio contínuo e suave dentro dos subintervalos.

### Splines lineares


### Splines cúbicas


<!-- Necessário para usar o D3 -->
<script src="https://d3js.org/d3.v4.min.js"></script>

<!-- Exemplo teaser de interpoação -->
<script>
// Inicializando SVG
var margin = {top: 20, right: 15, bottom: 30, left: 35},
    width = 500 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;
var svg = d3.select(".graph-full").append("svg")
    .attr("width", width+margin.left+margin.right)
    .attr("height", height+margin.top+margin.bottom)
    .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Definindo eixos
var x = d3.scaleLinear().domain([0, 4]).range([0, width]);
var y = d3.scaleLinear().domain([-0.5, 1.2]).range([height, 0]);
var line = d3.line()
            .x(function(d) { return x(d.x); })
            .y(function(d) { return y(d.y); });

svg.append("g")
    .attr("class","axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom().scale(x));

svg.append("g")
    .attr("class","axis")
    .call(d3.axisLeft(y));

// Scatter de pontos
var data = [
        {"x": 0.25, "y": 0.25},
        {"x": 1.00, "y": 0.47},
        {"x": 1.25, "y": 0.95},
        {"x": 1.75, "y": 0.99},
        {"x": 3.10, "y": 0.15},
        {"x": 3.47, "y": 0.27}
    ];
svg.selectAll("dot")
    .data(data)
  .enter().append("circle")
    .attr("class","curve")
    .attr("r", 3)
    .attr("cx", function(d,i) { return x(d.x); })
    .attr("cy", function(d) { return y(d.y); })

// Plot de linhas
d3.csv("{{site.baseurl}}/assets/data/interpolation.csv",
    function(interp){
        interp.forEach( function(d) {
                d.x = +d.x;
                d.y = +d.y;
            });

        svg.append("path")
            .attr("class","curve dashed")
            .attr("d", line(interp));
    }
);
</script>

<!-- Exemplo de polinômio de alto grau e as oscilações -->
<script>
</script>
