---
layout: right-sidebar
title:  Integração numérica
tags: [numerical-methods, pt-br]
summary: (pt-BR) Numerical quadrature methods (Newton-Cotes, Gauss, Gauss-Legendre) for numerical integration formulas
author: RNakanishi
date: 2017-06-12
sidebar: |
  # Conteúdo
  ## [Regra do ponto médio](#regra-do-ponto-médio)
  ## [Quadratura de Newton-Cotes](quadratura-de-newton-cotes)
  ### [Regra do Trapézio](#regra-do-trapezio)
  ### [Regra 1/3 de Simpson](#13-de-simpson)
  ## [Quadratura de Gauss](#quadratura-de-gauss)
  ### [Polinômios de Legendre](#polinômios-de-legendre)
---

O objetivo dos métodos de integração numérica é encontrar a área abaixo da curva da função que se deseja interpolar. Ou seja, dado uma função real $$f \in C[a,b]$$ queremos calcular \$$\int^b_a f(x)dx\$$. Observe que:

1. $$f(x)$$ pode ser uma função complexa de integrar;
2. $$f(x)$$ pode ser uma função amostrada em tabela.

## Regra do ponto médio
Para se encontrar um método numérico básico, relembremos uma das propriedades de integrais: um intervalo de integração pode ser subdividido em dois subintervalos, ou seja, dado $$a<c<b$$, podemos fazer: \$$\int^b_a f(x)dx = \int^c_a f(x)dx + \int_c^b f(x)dx.\$$

Definimos então a regra do ponto médio: dado $$f(x)\in C[a,b]$$, e $$N$$ subintervalos em $$[a,b]$$ de comprimento $$h = \frac{b-a}{N}$$ com $$x_0 = a$$ e $$x_N = b$$, temos: \$$\int_{x_0}^{x_N} f(x)dx \approx h \sum_{k=1}^N f(\bar{x}_k),\$$com $$\bar{x}_k = \frac{x_{k-1}+x_k}{2}$$.

![Regra do ponto médio]({{site.baseurl}}/assets/blog-images/integration/midrule.png){: .image.medium}

{: .image.caption.medium}
Figura ilustrativa da regra do ponto médio.


## Quadratura de Newton-Cotes
A estratégia adotada pelos métodos de quadratura é tentar encontrar uma aproximação para a integral $$\int_a^b f(x)dx$$ usando uma combinação linear de valores de f(x): \$$\int_a^b f(x)dx \approx \sum_{k=0}^N A_k f(x_k),\$$ em que $$x_k$$ são chamados de pontos de quadratura e $$A_k$$ são os coeficientes de quadratura.

A integração de Newton-Cotes envolve integrar o polinômio de interpolação $$P_n(x)$$. Sejam $$(n+1)$$ pontos igualmente espaçados, e uma função $$f: [a,b]\to \mathbb(R)$$ (conhecida ou não), cujos valores nos pontos são conhecidos, $$y_i = f(x_i)$$, $$i = 0, \cdots, n$$. Pela fórmula de quadratura, temos: \$$\int_a^b f(x)dx = \int_{x_0}^{x_n} f(x)dx \approx \int_{x_0}^{x_n} P_n(x)dx = \sum_{k=0}^{n}y_k \int_{x_0}^{x_n}l_k(x)dx.\$$ Observe que, o coeficiente de quadratura corresponde à integral do polinômio de Lagrange, $$A_k = \int_{x_0}^{x_n}l_k(x)dx$$.
Realizando uma mudança de variável $$x = x_0 + th$$, temos que $$dx = h dt$$ e quando $$\begin{cases}x = x_0, t = 0\\x = x_n, t = n\end{cases}$$. Então, temos \$$\int_{x_0}^{x_n}f(x)dx \approx \sum_{k=0}^n y_kh\int_0^n\lambda_k(t)dt = \sum_{k=0}^n y_khC_k^n\$$. Observe que \$$\lambda_k(t) = \frac{\prod_{i=0,i\neq k}^n(t-i)}{\prod_{i=0,i\neq k}^n(k-i)}.\$$


![Regra do trapézio]({{site.baseurl}}/assets/blog-images/integration/trapezio.png){: .image.right}

{: .image.right.caption}
Figura ilustrativa da Regra do Trapézio

{: id="regra-do-trapezio"}
### Caso $$n=1$$: Regra do trapézio
Como temos apenas dois pontos de quadratura ($$x_0$$ e $$x_1$$), realizamos a integração nesse intervalo.

$$
\begin{eqnarray}
\int_{x_0}^{x_1}f(x)dx &=& \sum_{k=0}^1 y_khC_k^1 \\
&=& y_0hC_0^1 + y_1hC_1^1
\end{eqnarray}
$$

Observe que as integrais dos termos $$C_k^1$$ resultam em $$C_0^1 = C_1^1 = \frac{1}{2}$$.

Então, a regra de quadratura para Newton-Cotes com dois pontos (_Regra do trapézio_) é: \$$\int_{x_0}^{x_1}f(x)dx = \frac{h}{2}(y_0+y_1)\$$

![Regra 1/3 de Simpson]({{site.baseurl}}/assets/blog-images/integration/simpson.png){: .image.right}

{: .image.right.caption}
Figura ilustrativa da Regra 1/3 de Simpson

{: id="13-de-simpson"}
### Caso $$n=2$$: Regra 1/3 de Simpson
Seguindo o raciocínio análogo à regra do trapézio, temos 3 pontos de quadratura ($$x_0, x_1$$ e $$x_2$$).

$$
\begin{eqnarray}
\int_{x_0}^{x_2}f(x)dx &=& \sum_{k=0}^2 y_khC_k^1 \\
&=& y_0hC_0^2 + y_1hC_1^2 + y_2hC_2^2
\end{eqnarray}
$$

E realizando a integração dos coeficientes de quadratura, obtemos $$C_0^2 = C_2^2 = \frac{1}{3}$$ e $$C_1^2 = \frac{4}{3}.$$ Então temos que a regra de quadratura é: \$$\int_{x_0}^{x_2}f(x)dx = \frac{h}{3}(y_0+4y_1+y_2)\$$


## Quadratura de Gauss

As fórmulas de Newton-Cotes aproximam valores para a integral de $$f(x)$$ em um intervalo com nós igualmente espaçados. Porém, a generalização das fórmulas pode reduzir a precisão do método. Uma abordagem para encontrar a melhor reta que calcula a área abaixo da curva é utilizando a quadratura de Gauss.

A quadratura de Gauss escolhe nós de maneira ótima, ou seja, o método tenta minimizar o erro de integração escolhendo pontos $$\xi_0,\cdots,\xi_n\in[a,b]$$ e coeficientes $$\omega_0,\cdots,\omega_n$$ tais que \$$\int_a^b f(x)dx \approx \sum_{k=0}^n \omega_kf(\xi_k).\$$
Para garantir a precisão, assume-se que a melhor escolha fornece um resultado exato quando $$f\in P_m$$, em que $$m$$ é o grau de precisão. Nesse caso, escolhemos $$m = 2n+1$$, uma vez que temos $$2m+2$$ variáveis a serem otimizadas.

Supondo que tenhamos uma função $f$ polinomial, queremos que ela seja exata com $$n$$ pontos. Então, por substituição dos valores, e resolvendo a integral, chega-se em um sistema que é possível determinar os valores dos pesos $$\omega_k$$ e $$\xi_k$$. Porém, muito comumente é encontrado os valores para essas variáveis já tabelados pelos polinômios de Legendre.

### Polinômios de Legendre

{: .definition}
> **Polinômios ortogonais** são polinômios da família $${\phi_0, \phi_1, \cdots, \phi_n, \cdots}$$ definidos em $$[a,b]$$ com $$grau(\phi_n)=n$$ (e $$\phi_0\neq 0$$), tais que
> \$$\langle\phi_m,\phi_n\rangle = \int_a^b W(x)[\phi_m(x)\phi_n(x)]dx = 0\quad \text{se } m\neq n.\$$.
> $$W(x)$$ é positivo e é dita função peso, com $$W\in C[a,b]$$.

Considerando um intervalo $$[-1,1]$$ e o produto interno com função peso $$W(x) = 1$$, os _polinômios de Legendre_ são gerados pela recursão:

$$
\begin{eqnarray}
    \phi_0(x) &=& 1\\
    \phi_1(x) &=& x\\
    \phi_{k+1}(x) &=& \frac{2k+1}{k+1}x\phi_k(x) - \frac{k}{k+1}\phi_{k-1}(x)\quad k = 1,2,\cdots
\end{eqnarray}
$$

### Quadratura de Gauss-Legendre
 A quadratura de Gauss-Legendre envolve determinar as raízes $$\xi_k$$ de $$\phi_{n+1}(x)$$ utilizando os polinômios de Legendre e então determinar os pesos para cada raiz. Na prática, os valores de $$\xi_k$$ e $$\omega_k$$ são tabelados para cada valor de $$n$$:

{: .bottom-line}
|n|$$\xi_k$$|$$\omega_k$$|
|---|---|
|1|$$\pm$$0.5773502691|1.0|
|---|
|2|$$\pm$$0.7745966692|0.555555555|
||0.0|0.888888888|
|---|
|3|$$\pm$$0.8611363115|0.3478548451|
||$$\pm$$0.3399810435|0.6521451548|
|---|
|4|$$\pm$$0.9061798459|0.2369268850|
||$$\pm$$0.5384693101|0.4786286704|
||0.0|0.5688888888|

Observe que as quadraturas de Gauss-Legendre são apenas para integrais no intervalo $$[-1,1]$$. Para integrar em um intervalo genérico $$[a,b]$$ é necessário realizar a mudança de intervalos de integração: \$$\int_{-a}^{b}f(x)dx = \frac{b-a}{2}\int_{-1}^1f(\frac{(b-a)t+b+a}{2}) dt.\$$
