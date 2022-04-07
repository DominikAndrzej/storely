package com.example.storelyServer.utilities;

import org.hibernate.search.mapper.pojo.bridge.binding.ValueBindingContext;
import org.hibernate.search.mapper.pojo.bridge.mapping.programmatic.ValueBinder;

public class BooleanAsStringBinder implements ValueBinder {

    @Override
    @SuppressWarnings("unchecked")
    public void bind(ValueBindingContext<?> context) {
        String trueAsString = (String) context.param( "trueAsString" );
        String falseAsString = (String) context.param( "falseAsString" );

        context.bridge( Boolean.class,
                new BooleanAsStringBridge( trueAsString, falseAsString ) );
    }
}