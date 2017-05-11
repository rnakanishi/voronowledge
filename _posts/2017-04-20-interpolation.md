---
layout: right-sidebar
title:  Métodos de interpolação
tags: [interpolation, pt-br]
summary: (pt-BR) Lagrange, Hermite and Spline interpolation methods.
author: RNakanishi
sidebar: |
  # Conteúdo
  ## [Polinômios de Lagrange](#polinômios-de-lagrange)
  ## [Interpolação de Hermite](#interpolação-de-hermite)
  ### [Diferenças divididas](#diferenças-divididas)
  ### [Polinômios de Newton](#polinômios-de-newton)
  ## [Interpolação por partes](#interpolação-por-partes)
  ### [Splines](#splines)
  ### [Splines cúbicas](#splines-cúbicas)
---

Interpolações são métodos utilizados quando se deseja saber o valor desconhecido dentro de um intervalo dado por uma amostra.


## Polinômios de Lagrange

O polinômio de Lagrange é da forma \$$ P(x) = \sum_{k=0}^n f(x_k)L_k(x) \$$ \$$ L_k(x) = \frac{\prod_{i=0, i\neq k}^n (x-x_i)}{\prod_{i=0, i\neq k}^n(x_k-x_i)}. \$$

### Implementação
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


## Interpolação de Hermite
Para construção do polinômio de hermite, é necessário antes apresentar duas ferramentas: diferenças divididas e polinômios de Newton.

### Diferenças divididas

### Polinômios de Newton
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Implementação
{% highlight matlab %}
z = zeros(2*n,1);
Q = zeros(2*n);
N = ones(2*n,length(x));

z(1:2:2*n) = xi;
z(2:2:2*n) = xi;

% Matriz de Hermite
Q(1:2:2*n,1) = yi;
Q(2:2:2*n,1) = yi;
Q(2:2:2*n,2) = dyi;

Q(3:2:2*n,2) = ( Q(2:2:2*n-2,1) - Q(3:2:2*n,1) ) ./ ( z(2:2:2*n-2) - z(3:2:2*n) );

% Completando a matriz
for j=3:2*n
    for i=j:2*n
        Q(i,j) = (Q(i,j-1) - Q(i-1,j-1)) / (z(i) - z(i-j+1));
    end
end

for i=2:2*n % forma de Newton
    for k = 1:i-1
        N(i,:) = N(i,:).*(x-z(k));
    end
end
y = diag(Q)'*N;
{% endhighlight %}

bla

## Interpolação por partes

### Splines lineares
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Splines cúbicas
ploplo
